import type { Topic } from "@/types/content-types"
import bigBang from "./articles/big-bang"
import cosmicExpansion from "./articles/cosmic-expansion"
import darkEnergy from "./articles/dark-energy"

// Define the topic
const topic: Topic = {
  id: "cosmology",
  title: "Cosmology",
  description: "The study of the origin, evolution, and ultimate fate of the universe",
  slug: "cosmology",
  articles: [bigBang, cosmicExpansion, darkEnergy],
}

export default topic
