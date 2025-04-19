"use client"

import { Button } from "@/components/ui/button"
import { Github, Download, FileCode, BookOpen, FileText, Copy } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function ContributePage() {
  const downloadTemplate = (filename, content) => {
    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contribute to Space Explorer</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Help us expand our knowledge base by contributing articles, fixing bugs, or suggesting improvements
        </p>
      </div>

      <Tabs defaultValue="how-to" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="how-to">How to Contribute</TabsTrigger>
          <TabsTrigger value="content">Adding Content</TabsTrigger>
          <TabsTrigger value="code">Code Contributions</TabsTrigger>
        </TabsList>

        <TabsContent value="how-to">
          <div className="space-y-12">
            <section className="bg-purple-900/20 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">How to Contribute</h2>
              <p className="mb-6 text-gray-300">
                Space Explorer is an open-source project that relies on contributions from the community. Here's how you
                can help:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-purple-500/30 rounded-lg p-6 bg-black/40">
                  <h3 className="text-xl font-bold mb-3">Content Contributions</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Write new articles on space and science topics</li>
                    <li>• Update existing articles with new information</li>
                    <li>• Add images and diagrams to enhance content</li>
                    <li>• Suggest new topics to cover</li>
                  </ul>
                </div>

                <div className="border border-purple-500/30 rounded-lg p-6 bg-black/40">
                  <h3 className="text-xl font-bold mb-3">Technical Contributions</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Fix bugs and improve performance</li>
                    <li>• Add new features to the website</li>
                    <li>• Improve accessibility and user experience</li>
                    <li>• Write tests and documentation</li>
                    <li>• Write tests and documentation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contribution Process</h2>
              <ol className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Fork the Repository</h3>
                    <p className="text-gray-300">
                      Start by forking the Space Explorer repository on GitHub to your own account.
                    </p>
                  </div>
                </li>

                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Create a Branch</h3>
                    <p className="text-gray-300">Create a new branch for your contribution with a descriptive name.</p>
                  </div>
                </li>

                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Make Your Changes</h3>
                    <p className="text-gray-300">
                      Add your content or code changes following our style guide and best practices.
                    </p>
                  </div>
                </li>

                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Submit a Pull Request</h3>
                    <p className="text-gray-300">
                      Once you're satisfied with your changes, submit a pull request to the main repository.
                    </p>
                  </div>
                </li>

                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold mr-4">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Review and Iterate</h3>
                    <p className="text-gray-300">
                      Our team will review your contribution and may suggest changes. Work with us to refine your
                      submission.
                    </p>
                  </div>
                </li>
              </ol>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="space-y-8">
            <section className="bg-purple-900/20 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Adding Content to Space Explorer</h2>
              <p className="mb-6 text-gray-300">
                Our content system makes it easy to add new topics and articles. Follow these steps to contribute
                content:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-purple-500/30 rounded-lg p-6 bg-black/40">
                  <h3 className="text-xl font-bold mb-3">Content Structure</h3>
                  <p className="text-gray-300 mb-4">Space Explorer organizes content into topics and articles:</p>
                  <pre className="bg-black/60 p-3 rounded text-sm overflow-x-auto">
                    <code className="text-gray-300">
                      {`content/
└── topics/
    ├── black-holes/
    │   ├── index.ts
    │   └── articles/
    │       ├── event-horizon.ts
    │       └── hawking-radiation.ts
    └── exoplanets/
        ├── index.ts
        └── articles/`}
                    </code>
                  </pre>
                </div>

                <div className="border border-purple-500/30 rounded-lg p-6 bg-black/40">
                  <h3 className="text-xl font-bold mb-3">Content Templates</h3>
                  <p className="text-gray-300 mb-4">
                    Use our templates to get started quickly. Download and modify them to create your own content.
                  </p>
                  <div className="flex flex-col space-y-3">
                    <TemplateDownloadButton
                      filename="topic-template.ts"
                      label="Topic Template"
                      content={topicTemplateContent}
                    />
                    <TemplateDownloadButton
                      filename="article-template.ts"
                      label="Article Template"
                      content={articleTemplateContent}
                    />
                    <TemplateDownloadButton
                      filename="CONTENT_GUIDE.md"
                      label="Full Content Guide"
                      content={contentGuideContent}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Step-by-Step Content Creation</h2>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-black/40 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileCode className="mr-2 h-5 w-5 text-purple-400" />
                      Step 1: Create Topic
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Create a new folder in <code className="bg-black/60 px-1 rounded">content/topics/</code> with your
                      topic's slug (e.g., <code className="bg-black/60 px-1 rounded">neutron-stars</code>).
                    </p>
                  </CardContent>
                  <CardFooter>
                    <pre className="bg-black/60 p-2 rounded text-xs w-full overflow-x-auto">
                      <code className="text-gray-300">mkdir -p content/topics/your-topic/articles</code>
                    </pre>
                  </CardFooter>
                </Card>

                <Card className="bg-black/40 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-purple-400" />
                      Step 2: Define Topic
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Create an <code className="bg-black/60 px-1 rounded">index.ts</code> file in your topic folder
                      with metadata and configuration.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <pre className="bg-black/60 p-2 rounded text-xs w-full overflow-x-auto">
                      <code className="text-gray-300">
                        {`// content/topics/your-topic/index.ts
import type { Topic } from "@/types/content-types"

const topic: Topic = {
  id: "your-topic-slug",
  title: "Your Topic Title",
  description: "Description here",
  slug: "your-topic-slug",
  articles: []
}

export default topic`}
                      </code>
                    </pre>
                  </CardFooter>
                </Card>

                <Card className="bg-black/40 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-purple-400" />
                      Step 3: Add Articles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Create article files in the <code className="bg-black/60 px-1 rounded">articles</code> folder and
                      import them in your topic index.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <pre className="bg-black/60 p-2 rounded text-xs w-full overflow-x-auto">
                      <code className="text-gray-300">
                        {`// content/topics/your-topic/articles/your-article.ts
import type { Article } from "@/types/content-types"

const article: Article = {
  id: "your-article-slug",
  title: "Your Article Title",
  slug: "your-article-slug",
  excerpt: "Brief summary",
  content: \`# Markdown content here\`,
  author: "Your Name",
  publishedDate: "2023-05-15"
}

export default article`}
                      </code>
                    </pre>
                  </CardFooter>
                </Card>
              </div>
            </section>

            <section className="bg-purple-900/20 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Content Guidelines</h2>
              <div className="space-y-4 text-gray-300">
                <p>When contributing content to Space Explorer, please follow these guidelines:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Ensure all information is scientifically accurate and up-to-date</li>
                  <li>Write in clear, accessible language that's understandable to a general audience</li>
                  <li>Include references and citations for scientific claims</li>
                  <li>Use high-quality images with proper attribution</li>
                  <li>Follow our formatting and style conventions</li>
                  <li>Avoid plagiarism - all content should be original or properly cited</li>
                </ul>

                <div className="mt-6">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => downloadTemplate("CONTENT_GUIDE.md", contentGuideContent)}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Read Full Content Guide
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="space-y-8">
            <section className="bg-purple-900/20 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Code Contributions</h2>
              <p className="mb-6 text-gray-300">
                Help improve Space Explorer by contributing code. Here's how to get started:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-purple-500/30 rounded-lg p-6 bg-black/40">
                  <h3 className="text-xl font-bold mb-3">Development Setup</h3>
                  <ol className="space-y-2 text-gray-300 list-decimal pl-5">
                    <li>Fork the repository on GitHub</li>
                    <li>Clone your fork locally</li>
                    <li>
                      Install dependencies with <code className="bg-black/60 px-1 rounded">npm install</code>
                    </li>
                    <li>Create a branch for your feature</li>
                    <li>Make your changes</li>
                    <li>Test thoroughly</li>
                    <li>Submit a pull request</li>
                  </ol>
                </div>

                <div className="border border-purple-500/30 rounded-lg p-6 bg-black/40">
                  <h3 className="text-xl font-bold mb-3">Code Standards</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Follow the existing code style</li>
                    <li>• Write tests for new features</li>
                    <li>• Ensure accessibility compliance</li>
                    <li>• Optimize for performance</li>
                    <li>• Document your code</li>
                    <li>• Keep pull requests focused on a single feature</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-purple-900/20 rounded-lg p-6 md:p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Contribute?</h2>
              <p className="mb-6 text-gray-300 max-w-2xl mx-auto">
                Join our community of space enthusiasts and help us build the most comprehensive resource on space and
                science.
              </p>

              <Link href="https://github.com/space-explorer/space-explorer" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Github className="mr-2 h-5 w-5" />
                  Visit Our GitHub Repository
                </Button>
              </Link>
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Template Download Button Component
function TemplateDownloadButton({ filename, label, content }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" className="flex-1 justify-start" onClick={() => downloadTemplate(filename, content)}>
        <Download className="mr-2 h-4 w-4" />
        {label}
      </Button>
      <Button variant="outline" className="px-3" onClick={() => copyToClipboard(content)} title="Copy to clipboard">
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copy to clipboard</span>
      </Button>
    </div>
  )
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
