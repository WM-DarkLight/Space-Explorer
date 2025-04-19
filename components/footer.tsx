import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-black/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              SpaceExplorer
            </h3>
            <p className="text-gray-400 max-w-xs">
              Discover the wonders of space and science through our modular, community-driven platform.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/space-explorer/space-explorer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com/spaceexplorer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="mailto:contact@spaceexplorer.com" className="text-gray-400 hover:text-purple-400">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/topics" className="text-gray-400 hover:text-purple-400">
                  Topics
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-400 hover:text-purple-400">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/interactive" className="text-gray-400 hover:text-purple-400">
                  Interactive
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contribute</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contribute" className="text-gray-400 hover:text-purple-400">
                  How to Contribute
                </Link>
              </li>
              <li>
                <Link href="/style-guide" className="text-gray-400 hover:text-purple-400">
                  Style Guide
                </Link>
              </li>
              <li>
                <Link href="/code-of-conduct" className="text-gray-400 hover:text-purple-400">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/space-explorer/space-explorer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400"
                >
                  GitHub Repository
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-purple-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-purple-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/license" className="text-gray-400 hover:text-purple-400">
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} SpaceExplorer. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">Built with Next.js and IndexedDB. Hosted on Vercel.</p>
        </div>
      </div>
    </footer>
  )
}
