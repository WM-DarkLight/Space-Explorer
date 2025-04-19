import type { Topic } from "@/types/content-types"
import spaceRace from "./articles/space-race"
import marsExploration from "./articles/mars-exploration"
import futureOfSpaceTravel from "./articles/future-of-space-travel"

// Define the topic
const topic: Topic = {
  id: "space-exploration",
  title: "Space Exploration",
  description: "The history, current missions, and future of humanity's journey beyond Earth",
  slug: "space-exploration",
  articles: [spaceRace, marsExploration, futureOfSpaceTravel],
}

export default topic
