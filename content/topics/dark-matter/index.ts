import type { Topic } from "@/types/content-types"
import mappingDarkMatter from "./articles/mapping-dark-matter"

// Define the topic
const topic: Topic = {
  id: "dark-matter",
  title: "Dark Matter",
  description: "Mysterious substance that doesn't emit light but accounts for most matter",
  slug: "dark-matter",
  articles: [
    mappingDarkMatter,
    // Add more articles by importing them here
  ],
}

export default topic
