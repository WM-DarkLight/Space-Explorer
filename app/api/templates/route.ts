import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const template = searchParams.get("template")

  let content = ""
  let filename = ""

  switch (template) {
    case "topic":
      content = topicTemplateContent
      filename = "topic-template.ts"
      break
    case "article":
      content = articleTemplateContent
      filename = "article-template.ts"
      break
    case "guide":
      content = contentGuideContent
      filename = "CONTENT_GUIDE.md"
      break
    default:
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
  }

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}

// Template Contents
const topicTemplateContent = `import type { Topic } from "@/types/content-types"
// Import your articles
// import yourArticle from "./articles/your-article"

/**
 * TOPIC TEMPLATE
 *
 * Instructions:
 * 1. Copy this file to content/topics/your-topic-slug/index.ts
 * 2. Fill in the topic details below
 * 3. Create article files in the articles folder
 * 4. Import and add your topic to the array in content/topics/index.ts
 */

// Define the topic
const topic: Topic = {
  id: "your-topic-slug", // Use the same value as the slug
  title: "Your Topic Title", // Display name (e.g., "Black Holes")
  description: "A brief description of your topic (1-2 sentences)",
  slug: "your-topic-slug", // This will be used in the URL
  imageUrl: "/images/topics/your-topic-slug.jpg", // Optional
  articles: [
    // Import and add your articles here
    // yourArticle,
  ],
  // Optional fields
  featuredArticleId: "your-featured-article-slug", // ID of the article to feature
  tags: ["tag1", "tag2"], // Optional tags for filtering
}

export default topic
`

const articleTemplateContent = `import type { Article } from "@/types/content-types"

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
  content: \`
# Your Article Title

## Introduction

Write your article content here using Markdown formatting. This section should introduce the topic
and provide context for the reader.

## Main Section

You can include sections, paragraphs, lists, and more. This is where the bulk of your content will go.

### Subsection

- Bullet  lists, and more. This is where the bulk of your content will go.

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
  \`,
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
`

const contentGuideContent = `# Space Explorer Content Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Content Structure](#content-structure)
3. [Creating Topics](#creating-topics)
4. [Writing Articles](#writing-articles)
5. [Markdown Guide](#markdown-guide)
6. [Scientific Accuracy](#scientific-accuracy)
7. [Images and Media](#images-and-media)
8. [Interactive Elements](#interactive-elements)
9. [Content Validation](#content-validation)
10. [Publishing Process](#publishing-process)

## Introduction

This guide provides comprehensive instructions for contributing content to Space Explorer. Our goal is to create high-quality, scientifically accurate, and engaging content about space and astronomy.

## Content Structure

Space Explorer organizes content into **topics** and **articles**:

- **Topics** are broad subjects like "Black Holes" or "Exoplanets"
- **Articles** are individual pieces of content within a topic

The file structure follows this pattern:

\`\`\`
content/
└── topics/
    ├── black-holes/
    │   ├── index.ts         # Topic definition
    │   └── articles/
    │       ├── event-horizon.ts
    │       └── hawking-radiation.ts
    └── exoplanets/
        ├── index.ts
        └── articles/
            ├── detection-methods.ts
            └── habitable-zones.ts
\`\`\`

## Creating Topics

### Step 1: Create the Topic Folder

Create a new folder in \`content/topics/\` with your topic's slug (e.g., \`neutron-stars\`).

### Step 2: Create the Topic Definition

Create an \`index.ts\` file in your topic folder:

\`\`\`typescript
import type { Topic } from "@/types/content-types"
import formationArticle from "./articles/formation"
import pulsarsArticle from "./articles/pulsars"

const topic: Topic = {
  id: "neutron-stars",
  title: "Neutron Stars",
  description: "Ultra-dense remnants of massive stars",
  slug: "neutron-stars",
  imageUrl: "/images/topics/neutron-stars.jpg",
  articles: [
    formationArticle,
    pulsarsArticle,
  ],
}

export default topic
\`\`\`

### Step 3: Register Your Topic

Import and add your topic to the array in \`content/topics.ts\`:

\`\`\`typescript
import blackHolesTopic from "./topics/black-holes"
import exoplanetsTopic from "./topics/exoplanets"
import neutronStarsTopic from "./topics/neutron-stars" // Your new topic

const topics = [
  blackHolesTopic,
  exoplanetsTopic,
  neutronStarsTopic, // Add it here
]

export default topics
\`\`\`

## Writing Articles

### Step 1: Create the Article File

Create a new file in your topic's \`articles\` folder:

\`\`\`typescript
import type { Article } from "@/types/content-types"

const article: Article = {
  id: "formation",
  title: "Formation of Neutron Stars",
  slug: "formation",
  excerpt: "How massive stars collapse to form neutron stars",
  content: \`
# Formation of Neutron Stars

Neutron stars form when massive stars (10-29 solar masses) exhaust their nuclear fuel...
  \`,
  author: "Dr. Astronomy",
  publishedDate: "2023-05-15",
}

export default article
\`\`\`

### Step 2: Add to Topic

Import and add your article to the topic's \`articles\` array in the topic's \`index.ts\` file.

## Markdown Guide

Articles use Markdown for formatting. Here's a quick reference:

### Headers

\`\`\`markdown
# Main Title (H1)
## Section Title (H2)
### Subsection Title (H3)
\`\`\`

### Text Formatting

\`\`\`markdown
**Bold text**
*Italic text*
~~Strikethrough~~
\`\`\`

### Lists

\`\`\`markdown
- Bullet point
- Another bullet point
  - Nested bullet point

1. Numbered item
2. Another numbered item
\`\`\`

### Links and Images

\`\`\`markdown
[Link text](https://example.com)
![Image alt text](/path/to/image.jpg)
\`\`\`

### Blockquotes and Code

\`\`\`markdown
> This is a blockquote

\`inline code\`

\`\`\`
// Code block
function example() {
  return "Hello World";
}
\`\`\`
\`\`\`

### Tables

\`\`\`markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
\`\`\`

## Scientific Accuracy

All content must be:

- Scientifically accurate and up-to-date
- Based on peer-reviewed research when possible
- Properly cited with references
- Clear about what is established science vs. theoretical

## Images and Media

- Use high-quality images relevant to the content
- Always provide proper attribution for images
- Optimize images for web (recommended max width: 1200px)
- Place images in the \`public/images/\` directory

## Interactive Elements

You can include interactive elements in your articles:

- Diagrams: Use the \`<InteractiveDiagram>\` component
- Quizzes: Use the \`<Quiz>\` component
- 3D Models: Use the \`<SpaceObject3D>\` component

## Content Validation

Before submitting, check that your content:

- Has no spelling or grammatical errors
- Uses consistent terminology
- Follows our style guide
- Has proper citations
- Includes appropriate images
- Is accessible to a general audience

## Publishing Process

1. Submit your content as a pull request
2. Our editorial team will review it
3. Address any feedback or requested changes
4. Once approved, your content will be merged and published
5. You'll be credited as the author

Thank you for contributing to Space Explorer!
`
