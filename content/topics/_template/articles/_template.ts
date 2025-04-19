import type { Article } from "@/types/content-types"

// INSTRUCTIONS:
// 1. Copy this file and rename it to your-article-slug.ts
// 2. Fill in the article details below
// 3. Import this article in the parent topic's index.ts file

const article: Article = {
  id: "your-article-slug",
  title: "Your Article Title",
  slug: "your-article-slug", // This will be used in the URL
  excerpt: "A brief summary of your article that will appear in previews.",
  content: `
# Your Article Title

Write your article content here using Markdown formatting.

## Section Heading

You can include sections, paragraphs, lists, and more.

- Bullet points
- Work like this

## Another Section

Continue with more content. You can include as much text as you want.

The content can be as long as needed and supports full Markdown syntax.
  `,
  author: "Your Name",
  publishedDate: "2023-05-01", // Use YYYY-MM-DD format
}

export default article
