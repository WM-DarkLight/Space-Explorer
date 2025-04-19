# Adding Content to Space Explorer

Space Explorer is designed to be easily expandable. You can add new topics and articles directly to the codebase without needing to use the website interface.

## Adding a New Topic

1. Navigate to the `content/topics` directory
2. Copy the `_template` folder and rename it to your topic's slug (e.g., `exoplanets`)
3. Edit the `index.ts` file in your new topic folder to include your topic's details
4. Import and add your topic to the array in `content/topics/index.ts`

### Example Topic Structure

\`\`\`
content/
└── topics/
    ├── index.ts                  # Main topics index file
    └── exoplanets/               # Your topic folder
        ├── index.ts              # Topic metadata
        └── articles/             # Articles folder
            ├── habitable-zones.ts  # Article 1
            └── detection-methods.ts # Article 2
\`\`\`

### Example Topic File

\`\`\`typescript
// content/topics/exoplanets/index.ts
import type { Topic } from "@/types/content-types"
import habitableZones from "./articles/habitable-zones"
import detectionMethods from "./articles/detection-methods"

const topic: Topic = {
  id: "exoplanets",
  title: "Exoplanets",
  description: "Planets that orbit stars outside our solar system",
  slug: "exoplanets",
  articles: [
    habitableZones,
    detectionMethods,
    // Add more articles by importing them here
  ],
}

export default topic
\`\`\`

## Adding Articles to a Topic

1. Navigate to your topic's `articles` folder (e.g., `content/topics/exoplanets/articles/`)
2. Copy the `_template.ts` file from the template folder and rename it to your article's slug (e.g., `habitable-zones.ts`)
3. Edit the file to include your article's content
4. Import and add your article to the topic's `index.ts` file

### Example Article File

\`\`\`typescript
// content/topics/exoplanets/articles/habitable-zones.ts
import type { Article } from "@/types/content-types"

const article: Article = {
  id: "habitable-zones",
  title: "Habitable Zones Around Stars",
  slug: "habitable-zones",
  excerpt: "Exploring the 'Goldilocks' regions where life might exist.",
  content: `
# Habitable Zones Around Stars

Content of your article in Markdown format...
  `,
  author: "Your Name",
  publishedDate: "2023-05-15",
}

export default article
\`\`\`

## Adding Your Topic to the Index

After creating your topic folder and files, you need to add it to the main index:

\`\`\`typescript
// In content/topics.ts

import blackHoles from "./topics/black-holes"
import darkMatter from "./topics/dark-matter"
import galaxies from "./topics/galaxies"
import exoplanets from "./topics/exoplanets" // Import your new topic

export const allTopics = [
  blackHoles,
  darkMatter,
  galaxies,
  exoplanets, // Add your topic to the array
]

// Rest of the file remains the same
\`\`\`

## Writing Article Content

Articles use Markdown format for content, which supports:

- Headings (# H1, ## H2, etc.)
- Lists (- item or 1. item)
- **Bold** and *italic* text
- [Links](https://example.com)
- Images: ![Alt text](image-url)
- Code blocks
- And more!

## Building the Site

After adding your content, rebuild the site to see your changes:

\`\`\`bash
npm run build
npm run start
\`\`\`

Your new topic and articles will now be available on the site!
