# 🚀 Space Explorer

![Space Explorer Banner](/public/images/space-explorer-banner.png)

A modular, community-driven website focused on space and science topics. Space Explorer provides an immersive platform for exploring the cosmos through well-researched articles, interactive visualizations, and educational content.

[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## ✨ Features

- **📚 Modular Content Structure**: Topics organized in folders for easy expansion
- **🎨 Visual Engagement**: Animated space background and responsive design
- **👥 Community-Driven**: Easy to contribute through GitHub
- **⚡ Performance Optimized**: Built with Next.js and React Server Components
- **📱 Fully Responsive**: Optimized for all device sizes
- **🌙 Dark Mode**: Space-themed dark mode by default
- **♿ Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **🔍 Search Functionality**: Find articles and topics easily
- **📊 Interactive Elements**: Diagrams, quizzes, and visualizations
- **📅 Space Events Calendar**: Keep track of astronomical events
- **🌐 Multi-language Support**: Content available in multiple languages
- **📝 Markdown Support**: Write content in Markdown format

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Content**: File-based content system with Markdown
- **Animations**: CSS animations and React transitions
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/space-explorer/space-explorer.git
   cd space-explorer
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

\`\`\`
space-explorer/
├── app/                    # Next.js App Router pages
│   ├── articles/           # Article pages
│   ├── topics/             # Topic pages
│   ├── interactive/        # Interactive features
│   └── ...                 # Other app routes
├── components/             # React components
│   ├── ui/                 # UI components (shadcn)
│   └── ...                 # Custom components
├── content/                # Content files
│   └── topics/             # Topic content folders
│       ├── black-holes/    # Black holes topic
│       ├── galaxies/       # Galaxies topic
│       └── ...             # Other topics
├── lib/                    # Utility functions and services
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
\`\`\`

## 📝 Contributing Content

### Adding New Topics

You can add new topics and articles directly by modifying the codebase:

1. Copy the template file in `content/topics/_template.ts` and rename it to your topic's slug (e.g., `exoplanets.ts`)
2. Fill in your topic details and articles in the file
3. Import and add your topic to the array in `content/topics/index.ts`

See the [Adding Content Guide](docs/adding-content.md) for detailed instructions.

### Topic File Structure

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

## 🧪 Development

### Code Style

We use ESLint and Prettier for code formatting. Run linting with:

\`\`\`bash
npm run lint
# or
yarn lint
\`\`\`

### Building for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

### Running Tests

\`\`\`bash
npm run test
# or
yarn test
\`\`\`

## 📱 Responsive Design

Space Explorer is designed to work on all device sizes:

- **Mobile**: Optimized for phones with a hamburger menu
- **Tablet**: Adjusted layout for medium-sized screens
- **Desktop**: Full experience with all features
- **Large Screens**: Enhanced visuals for wide displays

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security

- All external links use `rel="noopener noreferrer"`
- Content is sanitized to prevent XSS attacks
- Form inputs are validated and sanitized

## 🚀 Deployment

The site is configured for easy deployment on Vercel:

1. Fork the repository
2. Connect to Vercel
3. Deploy

For other platforms, build the project with `npm run build` and serve the `out` directory.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Space imagery from [NASA](https://www.nasa.gov/)
- Icons from [Lucide](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Font from [Google Fonts](https://fonts.google.com/)

## 📬 Contact

- GitHub: [space-explorer](https://github.com/space-explorer)
- Twitter: [@spaceexplorer](https://twitter.com/spaceexplorer)
- Email: contact@spaceexplorer.com

---

Made with ❤️ by the Space Explorer team
