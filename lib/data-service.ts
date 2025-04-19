import { getAllTopics as getStaticTopics, getTopicBySlug as getStaticTopicBySlug } from "@/content/topics"
import type { Topic, Article } from "@/types/content-types"

// This service layer acts as an abstraction over the content sources
// It prioritizes the static file-based content

export async function getAllTopics(): Promise<Topic[]> {
  try {
    // Return topics from static content files
    return getStaticTopics()
  } catch (error) {
    console.error("Error fetching topics:", error)
    return []
  }
}

export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  try {
    return getStaticTopicBySlug(slug) || null
  } catch (error) {
    console.error(`Error fetching topic ${slug}:`, error)
    return null
  }
}

export async function getArticlesByTopic(topicId: string): Promise<Article[]> {
  try {
    const topic = getStaticTopicBySlug(topicId)
    return topic ? topic.articles : []
  } catch (error) {
    console.error(`Error fetching articles for topic ${topicId}:`, error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const topics = getStaticTopics()

    for (const topic of topics) {
      const article = topic.articles.find((article) => article.slug === slug)
      if (article) {
        return article
      }
    }

    return null
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error)
    return null
  }
}

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  try {
    const topics = getStaticTopics()
    const allArticles: Article[] = []

    // Collect all articles from all topics
    topics.forEach((topic) => {
      topic.articles.forEach((article) => {
        allArticles.push({
          ...article,
          topicId: topic.id,
        } as Article)
      })
    })

    // Sort by published date (newest first)
    allArticles.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())

    // Return the most recent articles
    return allArticles.slice(0, limit)
  } catch (error) {
    console.error("Error fetching featured articles:", error)
    return []
  }
}
