import type { Topic } from "@/types/content-types"
import starFormation from "./articles/star-formation"
import stellarLifecycles from "./articles/stellar-lifecycles"
import supernovae from "./articles/supernovae"

// Define the topic
const topic: Topic = {
  id: "stellar-evolution",
  title: "Stellar Evolution",
  description: "The birth, life, and death of stars across the cosmos",
  slug: "stellar-evolution",
  articles: [starFormation, stellarLifecycles, supernovae],
}

export default topic
