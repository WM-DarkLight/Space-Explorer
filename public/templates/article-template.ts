import type { Article } from "@/types/content-types"

/**
 * ARTICLE TEMPLATE
 *
 * Instructions:
 * 1. Copy this file to content/topics/your-topic-slug/articles/your-article-slug.ts
 * 2. Fill in the article details below
 * 3. Import this article in the parent topic's index.ts file
 */

const article: Article = {
  id: "your-article-slug", // Must be unique within the topic
  title: "Your Article Title",
  slug: "your-article-slug", // This will be used in the URL
  excerpt: "A brief summary of your article that will appear in previews (1-2 sentences).",
  content: `
# Your Article Title

## Introduction

Write your article content here using Markdown formatting. This section should introduce the topic
and provide context for the reader.

## Main Section

You can include sections, paragraphs, lists, and more. This is where the bulk of your content will go.

### Subsection

- Bullet points
- Work like this

1. Numbered lists
2. Work like this

## Another Section

Continue with more content. You can include as much text as you want.

![Image Description](/images/articles/your-image.jpg)

> Blockquotes can be used for quotes or important information.

## Conclusion

Summarize the key points of your article here.

## References

1. Author Name, "Title of Reference," Journal/Website, Year. [Link](https://example.com)
2. Another Reference
  `,
  author: "Your Name",
  publishedDate: "2023-05-01", // Use YYYY-MM-DD format

  // Optional fields
  lastUpdated: "2023-06-15", // When the article was last updated
  imageUrl: "/images/articles/your-article-image.jpg", // Featured image
  tags: ["tag1", "tag2"], // Tags for categorization
  readingTime: 5, // Estimated reading time in minutes

  // For article series
  series: {
    name: "Your Series Name", // Only if part of a series
    order: 1, // Position in the series
  },
}

export default article
