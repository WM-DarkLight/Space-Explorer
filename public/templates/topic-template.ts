import type { Topic } from "@/types/content-types"
// Import your articles
// import yourArticle from "./articles/your-article"

/**
 * TOPIC TEMPLATE
 *
 * Instructions:
 * 1. Copy this file to content/topics/your-topic-slug/index.ts
 * 2. Fill in the topic details below
 * 3. Create article files in the articles folder
 * 4. Import and add your topic to the array in content/topics/index.ts
 */

// Define the topic
const topic: Topic = {
  id: "your-topic-slug", // Use the same value as the slug
  title: "Your Topic Title", // Display name (e.g., "Black Holes")
  description: "A brief description of your topic (1-2 sentences)",
  slug: "your-topic-slug", // This will be used in the URL
  imageUrl: "/images/topics/your-topic-slug.jpg", // Optional
  articles: [
    // Import and add your articles here
    // yourArticle,
  ],
  // Optional fields
  featuredArticleId: "your-featured-article-slug", // ID of the article to feature
  tags: ["tag1", "tag2"], // Optional tags for filtering
}

export default topic
