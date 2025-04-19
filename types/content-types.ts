// Type definitions for content structure

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedDate: string
}

export interface Topic {
  id: string
  title: string
  description: string
  slug: string
  articles: Article[]
}
