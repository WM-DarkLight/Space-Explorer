export interface SearchResult {
  id: string
  title: string
  type: "article" | "topic" | "glossary" | "event"
  category?: string
  excerpt?: string
  url: string
  date?: string
  relevance: number
}
