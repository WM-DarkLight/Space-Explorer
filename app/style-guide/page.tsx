import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function StyleGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
        Style Guide
      </h1>

      <div className="prose prose-invert prose-purple max-w-none">
        <h2>Content Guidelines</h2>
        <p>
          SpaceExplorer aims to provide accurate, accessible, and engaging content about space and astronomy. This style
          guide ensures consistency across all articles and topics.
        </p>

        <h3>Writing Style</h3>
        <ul>
          <li>
            <strong>Accuracy:</strong> All scientific information must be factually accurate and based on current
            scientific consensus.
          </li>
          <li>
            <strong>Clarity:</strong> Explain complex concepts in clear, accessible language without oversimplification.
          </li>
          <li>
            <strong>Engagement:</strong> Use an engaging, conversational tone that invites curiosity.
          </li>
          <li>
            <strong>Inclusivity:</strong> Write content that is accessible to readers of diverse backgrounds and
            knowledge levels.
          </li>
        </ul>

        <h3>Article Structure</h3>
        <ul>
          <li>
            <strong>Introduction:</strong> Begin with a compelling hook and clear overview of the topic.
          </li>
          <li>
            <strong>Body:</strong> Organize content with clear headings and subheadings.
          </li>
          <li>
            <strong>Visuals:</strong> Include relevant images, diagrams, or interactive elements.
          </li>
          <li>
            <strong>Conclusion:</strong> Summarize key points and suggest related topics for further exploration.
          </li>
        </ul>

        <h3>Formatting</h3>
        <ul>
          <li>
            <strong>Headings:</strong> Use H2 for main sections and H3 for subsections.
          </li>
          <li>
            <strong>Lists:</strong> Use bulleted lists for sets of related items and numbered lists for sequential
            steps.
          </li>
          <li>
            <strong>Emphasis:</strong> Use bold for key terms and italics for emphasis.
          </li>
          <li>
            <strong>Citations:</strong> Include references to scientific papers or reliable sources.
          </li>
        </ul>

        <h2>Visual Guidelines</h2>

        <h3>Color Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          <div className="flex flex-col items-center">
            <div className="w-full h-20 bg-purple-600 rounded-md"></div>
            <span className="mt-2 text-sm">Primary Purple</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-20 bg-purple-400 rounded-md"></div>
            <span className="mt-2 text-sm">Light Purple</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-20 bg-blue-600 rounded-md"></div>
            <span className="mt-2 text-sm">Accent Blue</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-20 bg-gray-800 rounded-md"></div>
            <span className="mt-2 text-sm">Background</span>
          </div>
        </div>

        <h3>Typography</h3>
        <p>SpaceExplorer uses a combination of fonts for different purposes:</p>
        <ul>
          <li>
            <strong>Headings:</strong> Inter, sans-serif
          </li>
          <li>
            <strong>Body Text:</strong> Inter, sans-serif
          </li>
          <li>
            <strong>Code:</strong> Monospace
          </li>
        </ul>

        <h3>Images</h3>
        <ul>
          <li>Use high-quality, scientifically accurate images</li>
          <li>Include proper attribution for all images</li>
          <li>Optimize images for web performance</li>
          <li>Include descriptive alt text for accessibility</li>
        </ul>

        <h2>Contribution Process</h2>
        <p>When contributing content to SpaceExplorer, please follow these steps:</p>
        <ol>
          <li>Review existing content to understand the style and tone</li>
          <li>Create a draft following the structure guidelines</li>
          <li>Include references and sources</li>
          <li>Submit your contribution for review</li>
          <li>Address any feedback from reviewers</li>
        </ol>

        <p>
          For technical details on how to submit content, please refer to our{" "}
          <Link href="/contribute" className="text-purple-400 hover:text-purple-300">
            Contribution Guide
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
