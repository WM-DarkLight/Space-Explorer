import { getAllTopics } from "@/lib/content-service"
import type { SearchResult } from "@/types/search-types"

export async function GET() {
  try {
    // Get all topics
    const topics = await getAllTopics()

    // Create search results array
    const searchResults: SearchResult[] = []

    // Add topics to search results
    topics.forEach((topic) => {
      searchResults.push({
        id: `topic-${topic.id}`,
        title: topic.title,
        type: "topic",
        category: topic.slug,
        excerpt: topic.description,
        url: `/topics/${topic.slug}`,
        relevance: 0.7,
      })

      // Add articles to search results
      topic.articles.forEach((article) => {
        searchResults.push({
          id: `article-${article.id}`,
          title: article.title,
          type: "article",
          category: topic.slug,
          excerpt: article.excerpt,
          url: `/articles/${article.slug}`,
          date: article.publishedDate,
          relevance: 0.8,
        })
      })
    })

    // Add glossary terms (simulated for now)
    const glossaryTerms = [
      {
        id: "black-hole",
        term: "Black Hole",
        definition: "A region of spacetime where gravity is so strong that nothing can escape from it.",
        category: "black-holes",
      },
      {
        id: "dark-matter",
        term: "Dark Matter",
        definition: "A hypothetical form of matter that accounts for approximately 85% of the matter in the universe.",
        category: "dark-matter",
      },
      {
        id: "galaxy",
        term: "Galaxy",
        definition:
          "A system of millions or billions of stars, together with gas and dust, held together by gravitational attraction.",
        category: "galaxies",
      },
    ]

    glossaryTerms.forEach((term) => {
      searchResults.push({
        id: `glossary-${term.id}`,
        title: term.term,
        type: "glossary",
        category: term.category,
        excerpt: term.definition,
        url: `/glossary#${term.id}`,
        relevance: 0.6,
      })
    })

    // Add space events (simulated for now)
    const spaceEvents = [
      {
        id: "event-1",
        title: "Perseid Meteor Shower",
        date: "2025-08-12",
        category: "meteor-shower",
        excerpt: "One of the best meteor showers of the year, with up to 100 meteors per hour at its peak.",
      },
      {
        id: "event-2",
        title: "Total Solar Eclipse",
        date: "2025-03-29",
        category: "eclipse",
        excerpt: "A total solar eclipse visible from parts of North America, Europe, and North Africa.",
      },
    ]

    spaceEvents.forEach((event) => {
      searchResults.push({
        id: `event-${event.id}`,
        title: event.title,
        type: "event",
        category: event.category,
        excerpt: event.excerpt,
        url: `/events/${event.id}`,
        date: event.date,
        relevance: 0.5,
      })
    })

    return Response.json(searchResults)
  } catch (error) {
    console.error("Error in search API:", error)
    return Response.json({ error: "Failed to fetch search results" }, { status: 500 })
  }
}
