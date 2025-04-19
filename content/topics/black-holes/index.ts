import type { Topic } from "@/types/content-types"
import eventHorizonPhysics from "./articles/event-horizon-physics"

// Define the topic
const topic: Topic = {
  id: "black-holes",
  title: "Black Holes",
  description: "Regions of spacetime where gravity is so strong that nothing can escape",
  slug: "black-holes",
  articles: [
    eventHorizonPhysics,
    // Add more articles by importing them here
  ],
}

export default topic
