import type { Topic } from "@/types/content-types"
import habitableZones from "./articles/habitable-zones"
import detectionMethods from "./articles/detection-methods"
import extremeExoplanets from "./articles/extreme-exoplanets"

// Define the topic
const topic: Topic = {
  id: "exoplanets",
  title: "Exoplanets",
  description: "Planets that orbit stars outside our solar system",
  slug: "exoplanets",
  articles: [habitableZones, detectionMethods, extremeExoplanets],
}

export default topic
