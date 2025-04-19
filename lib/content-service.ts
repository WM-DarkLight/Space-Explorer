// Content service that uses the static content files
import {
  getAllTopics as getStaticTopics,
  getTopicBySlug as getStaticTopicBySlug,
  getArticlesByTopic as getStaticArticlesByTopic,
  getArticleBySlug as getStaticArticleBySlug,
  getFeaturedArticles as getStaticFeaturedArticles,
} from "@/content/topics"
import type { Topic, Article } from "@/types/content-types"

// Get all topics
export async function getAllTopics(): Promise<Topic[]> {
  // Return topics from static content files
  return getStaticTopics()
}

// Get a topic by slug
export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  return getStaticTopicBySlug(slug) || null
}

// Get all articles for a topic
export async function getArticlesByTopic(topicId: string): Promise<Article[]> {
  return getStaticArticlesByTopic(topicId)
}

// Get an article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return getStaticArticleBySlug(slug)
}

// Get featured articles
export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  return getStaticFeaturedArticles(limit)
}
