import type { Topic } from "@/types/content-types"
import blackHoles from "./topics/black-holes"
import darkMatter from "./topics/dark-matter"
import galaxies from "./topics/galaxies"
import exoplanets from "./topics/exoplanets"
import spaceExploration from "./topics/space-exploration"
import stellarEvolution from "./topics/stellar-evolution"
import cosmology from "./topics/cosmology"

// Export all topics
const allTopics: Topic[] = [blackHoles, darkMatter, galaxies, exoplanets, spaceExploration, stellarEvolution, cosmology]

// Get all topics
export async function getAllTopics(): Promise<Topic[]> {
  return allTopics
}

// Get a topic by slug
export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  const topic = allTopics.find((topic) => topic.slug === slug)
  return topic || null
}

// Get all articles for a topic
export async function getArticlesByTopic(topicId: string): Promise<any[]> {
  const topic = allTopics.find((topic) => topic.id === topicId)
  return topic ? topic.articles : []
}

// Get an article by slug
export async function getArticleBySlug(slug: string): Promise<any | null> {
  for (const topic of allTopics) {
    const article = topic.articles.find((article) => article.slug === slug)
    if (article) {
      return article
    }
  }
  return null
}

// Get featured articles
export async function getFeaturedArticles(limit = 5): Promise<any[]> {
  const allArticles: any[] = []

  allTopics.forEach((topic) => {
    topic.articles.forEach((article) => {
      allArticles.push({
        ...article,
        topicId: topic.id,
      })
    })
  })

  allArticles.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())

  return allArticles.slice(0, limit)
}

export { allTopics }
