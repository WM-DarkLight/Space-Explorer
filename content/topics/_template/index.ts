import type { Topic } from "@/types/content-types"
// Import your articles
// import yourArticle from "./articles/your-article"

// INSTRUCTIONS:
// 1. Copy this folder and rename it to your-topic-slug
// 2. Fill in the topic details below
// 3. Create article files in the articles folder
// 4. Import and add your topic to the array in content/topics/index.ts

// Define the topic
const topic: Topic = {
  id: "your-topic-slug", // Use the same value as the slug
  title: "Your Topic Title",
  description: "A brief description of your topic",
  slug: "your-topic-slug", // This will be used in the URL
  articles: [
    // Import and add your articles here
    // yourArticle,
  ],
}

export default topic
