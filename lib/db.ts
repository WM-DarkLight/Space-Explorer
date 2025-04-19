// IndexedDB database implementation for offline-first functionality

export interface Topic {
  id: string
  title: string
  description: string
  slug: string
  imageUrl: string
  articleCount: number
  createdAt: string
  updatedAt: string
}

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  imageUrl: string
  topicId: string
  author: string
  publishedDate: string
  createdAt: string
  updatedAt: string
}

const DB_NAME = "space-explorer-db"
const DB_VERSION = 1
const TOPICS_STORE = "topics"
const ARTICLES_STORE = "articles"

let db: IDBDatabase | null = null

export async function initializeDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) return resolve(db)

    if (!window.indexedDB) {
      console.error("Your browser doesn't support IndexedDB")
      reject("IndexedDB not supported")
      return
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      console.error("Database error:", (event.target as IDBRequest).error)
      reject((event.target as IDBRequest).error)
    }

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result
      console.log("Database initialized successfully")
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result

      // Create topics store
      if (!database.objectStoreNames.contains(TOPICS_STORE)) {
        const topicsStore = database.createObjectStore(TOPICS_STORE, { keyPath: "id" })
        topicsStore.createIndex("slug", "slug", { unique: true })
      }

      // Create articles store
      if (!database.objectStoreNames.contains(ARTICLES_STORE)) {
        const articlesStore = database.createObjectStore(ARTICLES_STORE, { keyPath: "id" })
        articlesStore.createIndex("slug", "slug", { unique: true })
        articlesStore.createIndex("topicId", "topicId", { unique: false })
      }

      // No sample data is added - we're using the file-based system instead
    }
  })
}

// Database operations for topics
export async function getAllTopics(): Promise<Topic[]> {
  const database = await initializeDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(TOPICS_STORE, "readonly")
    const store = transaction.objectStore(TOPICS_STORE)
    const request = store.getAll()

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  const database = await initializeDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(TOPICS_STORE, "readonly")
    const store = transaction.objectStore(TOPICS_STORE)
    const index = store.index("slug")
    const request = index.get(slug)

    request.onsuccess = () => {
      resolve(request.result || null)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

// Database operations for articles
export async function getArticlesByTopic(topicId: string): Promise<Article[]> {
  const database = await initializeDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(ARTICLES_STORE, "readonly")
    const store = transaction.objectStore(ARTICLES_STORE)
    const index = store.index("topicId")
    const request = index.getAll(topicId)

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const database = await initializeDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(ARTICLES_STORE, "readonly")
    const store = transaction.objectStore(ARTICLES_STORE)
    const index = store.index("slug")
    const request = index.get(slug)

    request.onsuccess = () => {
      resolve(request.result || null)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  const database = await initializeDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(ARTICLES_STORE, "readonly")
    const store = transaction.objectStore(ARTICLES_STORE)
    const request = store.getAll()

    request.onsuccess = () => {
      // In a real app, you'd have a "featured" flag or sort by views
      // Here we just return the most recent articles
      const articles = request.result
      articles.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
      resolve(articles.slice(0, limit))
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

// Add new article
export async function addArticle(article: Omit<Article, "id" | "createdAt" | "updatedAt">): Promise<Article> {
  const database = await initializeDatabase()

  const newArticle: Article = {
    ...article,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(ARTICLES_STORE, "readwrite")
    const store = transaction.objectStore(ARTICLES_STORE)
    const request = store.add(newArticle)

    request.onsuccess = () => {
      // Update article count for the topic
      updateTopicArticleCount(newArticle.topicId, 1)
      resolve(newArticle)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

// Update topic article count
async function updateTopicArticleCount(topicId: string, increment: number): Promise<void> {
  const database = await initializeDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(TOPICS_STORE, "readwrite")
    const store = transaction.objectStore(TOPICS_STORE)
    const request = store.get(topicId)

    request.onsuccess = () => {
      const topic = request.result
      if (topic) {
        topic.articleCount += increment
        topic.updatedAt = new Date().toISOString()

        const updateRequest = store.put(topic)
        updateRequest.onsuccess = () => {
          resolve()
        }
        updateRequest.onerror = () => {
          reject(updateRequest.error)
        }
      } else {
        resolve()
      }
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

// Add a new topic
export async function addTopic(topic: Omit<Topic, "id" | "createdAt" | "updatedAt" | "articleCount">): Promise<Topic> {
  const database = await initializeDatabase()

  const newTopic: Topic = {
    ...topic,
    id: crypto.randomUUID(),
    articleCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(TOPICS_STORE, "readwrite")
    const store = transaction.objectStore(TOPICS_STORE)
    const request = store.add(newTopic)

    request.onsuccess = () => {
      resolve(newTopic)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}
