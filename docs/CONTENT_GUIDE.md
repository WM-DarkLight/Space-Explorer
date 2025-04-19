# 📚 Space Explorer Content Guide

This comprehensive guide explains how to add and modify content in the Space Explorer project. Whether you're adding a new topic, writing an article, or updating existing content, this document will walk you through the process.

## 📋 Table of Contents

- [Content Structure Overview](#content-structure-overview)
- [Adding a New Topic](#adding-a-new-topic)
- [Adding Articles to a Topic](#adding-articles-to-a-topic)
- [Content Formatting Guidelines](#content-formatting-guidelines)
- [Adding Media and Resources](#adding-media-and-resources)
- [Interactive Elements](#interactive-elements)
- [Content Validation](#content-validation)
- [Advanced Topics](#advanced-topics)
- [Troubleshooting](#troubleshooting)

## 📁 Content Structure Overview

Space Explorer uses a file-based content system organized in the following structure:

\`\`\`
content/
└── topics/
    ├── index.ts                  # Main topics index file
    ├── _template/                # Template folder for new topics
    │   ├── index.ts              # Topic template
    │   └── articles/             # Articles template folder
    │       └── _template.ts      # Article template
    └── [topic-slug]/             # Topic folder (e.g., black-holes)
        ├── index.ts              # Topic metadata and configuration
        └── articles/             # Articles folder
            ├── [article-1].ts    # Article file (e.g., event-horizon.ts)
            └── [article-2].ts    # Another article file
\`\`\`

Each topic is a separate folder containing an `index.ts` file and an `articles` folder with individual article files.

## 🌟 Adding a New Topic

### Step 1: Create the Topic Folder

1. Navigate to `content/topics/`
2. Create a new folder with your topic's slug (e.g., `neutron-stars`)
   - Use kebab-case (lowercase with hyphens)
   - Choose a concise but descriptive name

### Step 2: Create the Topic Index File

Create an `index.ts` file in your topic folder with the following structure:

\`\`\`typescript
import type { Topic } from "@/types/content-types";
// Import your articles (you'll create these later)
// import articleOne from "./articles/article-one";

const topic: Topic = {
  id: "your-topic-slug", // Must match the folder name
  title: "Your Topic Title", // Display title (e.g., "Neutron Stars")
  description: "A brief description of your topic (1-2 sentences)",
  slug: "your-topic-slug", // URL slug, same as id
  imageUrl: "/images/topics/your-topic-slug.jpg", // Optional image
  articles: [
    // Add your imported articles here
    // articleOne,
  ],
};

export default topic;
\`\`\`

### Step 3: Create the Articles Folder

1. Inside your topic folder, create an `articles` folder
2. This will contain all the individual article files for this topic

### Step 4: Add Your Topic to the Index

Open `content/topics.ts` and add your topic to the exported array:

\`\`\`typescript
import blackHoles from "./topics/black-holes";
import yourTopic from "./topics/your-topic-slug";

export const allTopics = [
  blackHoles,
  // ... other topics
  yourTopic, // Add your topic here
];
\`\`\`

## 📝 Adding Articles to a Topic

### Step 1: Create an Article File

1. Navigate to your topic's `articles` folder (e.g., `content/topics/neutron-stars/articles/`)
2. Create a new file with your article's slug (e.g., `formation-process.ts`)

### Step 2: Define the Article Content

Use the following structure for your article file:

\`\`\`typescript
import type { Article } from "@/types/content-types";

const article: Article = {
  id: "article-slug", // Must be unique within the topic
  title: "Your Article Title",
  slug: "article-slug", // URL slug, same as id
  excerpt: "A brief summary of your article (1-2 sentences)",
  content: `
# Your Article Title

## Introduction

Your article content goes here. You can use Markdown formatting.

## Another Section

- Bullet points
- Work like this

### Subsection

More content here...

![Image Description](/images/articles/your-image.jpg)

## Conclusion

Concluding thoughts about the topic.
  `,
  author: "Your Name",
  publishedDate: "2023-05-15", // YYYY-MM-DD format
  lastUpdated: "2023-06-20", // Optional
  imageUrl: "/images/articles/your-article-image.jpg", // Optional
  tags: ["tag1", "tag2"], // Optional
};

export default article;
\`\`\`

### Step 3: Import the Article in the Topic Index

Update your topic's `index.ts` file to import and include your article:

\`\`\`typescript
import type { Topic } from "@/types/content-types";
import formationProcess from "./articles/formation-process";

const topic: Topic = {
  // ... topic metadata
  articles: [
    formationProcess,
    // Add more articles here
  ],
};

export default topic;
\`\`\`

## 📐 Content Formatting Guidelines

### Markdown Syntax

Articles use Markdown for formatting. Here are the supported elements:

- **Headings**: Use `#` for h1, `##` for h2, etc.
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Lists**:
  \`\`\`
  - Unordered list item
  - Another item
  
  1. Ordered list item
  2. Another item
  \`\`\`
- **Links**: `[link text](https://example.com)`
- **Images**: `![alt text](/path/to/image.jpg)`
- **Code blocks**:
  \`\`\`
  \`\`\`language
  code goes here
  \`\`\`
  \`\`\`
- **Blockquotes**: `> quoted text`
- **Horizontal rule**: `---`
- **Tables**:
  \`\`\`
  | Header 1 | Header 2 |
  |----------|----------|
  | Cell 1   | Cell 2   |
  \`\`\`

### Best Practices

1. **Structure**: Use a clear hierarchy of headings
2. **Length**: Aim for 1,000-2,500 words per article
3. **Paragraphs**: Keep paragraphs short (3-5 sentences)
4. **Images**: Include at least one image per article
5. **Citations**: Include sources for scientific claims
6. **Accessibility**: Add alt text to all images
7. **Language**: Write in clear, accessible language

## 🖼️ Adding Media and Resources

### Images

1. Add images to the `public/images/` directory
2. Use relative paths in your Markdown: `![Description](/images/your-image.jpg)`
3. Optimize images before adding them (recommended max size: 1MB)
4. Use descriptive filenames (e.g., `neutron-star-formation.jpg`)

### Diagrams

For diagrams, you can use:

1. Static images
2. Interactive diagrams (see [Interactive Elements](#interactive-elements))

### External Resources

To link to external resources:

\`\`\`markdown
For more information, see [NASA's article on neutron stars](https://science.nasa.gov/neutron-stars).
\`\`\`

## 🔧 Interactive Elements

Space Explorer supports several types of interactive elements:

### Interactive Diagrams

To add an interactive diagram, use the special component syntax:

\`\`\`markdown
<InteractiveDiagram id="neutron-star-layers" />
\`\`\`

Then create the corresponding component in `components/diagrams/neutron-star-layers.tsx`.

### Quizzes

To add a quiz:

\`\`\`markdown
<Quiz id="neutron-star-quiz" />
\`\`\`

Define the quiz questions in `content/quizzes/neutron-star-quiz.ts`.

### 3D Models

To add a 3D model viewer:

\`\`\`markdown
<ModelViewer src="/models/neutron-star.glb" alt="3D model of a neutron star" />
\`\`\`

## ✅ Content Validation

Before submitting your content:

1. **Scientific Accuracy**: Ensure all information is scientifically accurate
2. **Spelling and Grammar**: Check for errors
3. **Links**: Verify all links work
4. **Images**: Confirm images display correctly
5. **Formatting**: Check that Markdown renders as expected

## 🚀 Advanced Topics

### Custom Components

You can create custom components for your articles:

1. Create a component in `components/content/`
2. Use it in your Markdown with the component syntax: `<YourComponent prop="value" />`

### Series of Articles

To create a series:

1. Add a `series` property to your articles:
   \`\`\`typescript
   series: {
     name: "Neutron Star Series",
     order: 1, // Position in the series
   }
   \`\`\`

2. Link between articles in the series:
   \`\`\`markdown
   Continue to [Part 2: Pulsar Mechanics](/articles/pulsar-mechanics)
   \`\`\`

### Translations

To add translations:

1. Create a translations folder in your article directory
2. Add translated versions with language codes:
   \`\`\`
   articles/
   ├── formation-process.ts          # English (default)
   └── translations/
       ├── formation-process.es.ts   # Spanish
       └── formation-process.fr.ts   # French
   \`\`\`

## 🔍 Troubleshooting

### Common Issues

1. **Content not appearing**: Check that your article is imported in the topic's index file
2. **Images not displaying**: Verify the path is correct and the image exists
3. **Markdown not rendering**: Check for syntax errors in your Markdown

### Getting Help

If you encounter issues:

1. Check the [GitHub issues](https://github.com/space-explorer/space-explorer/issues)
2. Ask in the [Discord community](https://discord.gg/space-explorer)
3. Contact the maintainers at content@spaceexplorer.com

## 📋 Content Checklist

Use this checklist before submitting:

- [ ] Topic folder created with correct structure
- [ ] Topic added to main index
- [ ] Article files created with all required fields
- [ ] Articles imported in topic index
- [ ] Content follows scientific accuracy guidelines
- [ ] Markdown formatting is correct
- [ ] Images added and optimized
- [ ] Links checked and working
- [ ] Content reviewed for spelling and grammar

---

Happy content creating! 🚀✨
