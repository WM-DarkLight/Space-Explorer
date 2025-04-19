import type { Topic } from "@/types/content-types"
import galaxyFormation from "./articles/galaxy-formation"

// Define the topic
const topic: Topic = {
  id: "galaxies",
  title: "Galaxies",
  description: "Massive systems of stars, gas, dust, and dark matter held together by gravity",
  slug: "galaxies",
  articles: [
    galaxyFormation,
    // Add more articles by importing them here
  ],
}

export default topic
