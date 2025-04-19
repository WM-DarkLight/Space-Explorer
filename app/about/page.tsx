import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Space Explorer</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A community-driven platform dedicated to exploring the wonders of space and science
          </p>
        </div>

        <div className="space-y-12">
          <section className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-full">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                Space Explorer was created with a simple mission: to make space and science accessible to everyone. We
                believe that understanding the cosmos helps us appreciate our place in the universe and inspires the
                next generation of scientists and explorers.
              </p>
              <p className="text-gray-300">
                Through our modular, community-driven platform, we aim to create a comprehensive resource that covers
                everything from black holes and dark matter to galaxies and the search for extraterrestrial life.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-purple-500/30 rounded-lg p-6 bg-black/40">
                <h3 className="text-xl font-bold mb-3">Modular Content</h3>
                <p className="text-gray-300">
                  Our content is organized into topics and articles, making it easy to navigate and expand.
                </p>
              </div>

              <div className="border border-purple-500/30 rounded-lg p-6 bg-black/40">
                <h3 className="text-xl font-bold mb-3">Offline-First</h3>
                <p className="text-gray-300">
                  Using IndexedDB, Space Explorer works even without an internet connection.
                </p>
              </div>

              <div className="border border-purple-500/30 rounded-lg p-6 bg-black/40">
                <h3 className="text-xl font-bold mb-3">Community-Driven</h3>
                <p className="text-gray-300">
                  Anyone can contribute content, code, or suggestions through our GitHub repository.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-full">
              <h2 className="text-2xl font-bold mb-4">Open Source Philosophy</h2>
              <p className="text-gray-300 mb-4">
                Space Explorer is built on the principles of open source and open science. We believe that knowledge
                should be freely accessible to everyone, and that collaboration leads to better results.
              </p>
              <p className="text-gray-300">
                Our codebase is available on GitHub, and we welcome contributions from developers, writers, scientists,
                and space enthusiasts from around the world.
              </p>
              <div className="mt-6">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
            <p className="text-gray-300 mb-6">
              Space Explorer is built with modern web technologies to provide a fast, responsive, and accessible
              experience:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-purple-500/30 rounded-lg p-4 text-center bg-black/40">
                <h3 className="font-bold">Next.js</h3>
                <p className="text-sm text-gray-400">React Framework</p>
              </div>
              <div className="border border-purple-500/30 rounded-lg p-4 text-center bg-black/40">
                <h3 className="font-bold">IndexedDB</h3>
                <p className="text-sm text-gray-400">Offline Storage</p>
              </div>
              <div className="border border-purple-500/30 rounded-lg p-4 text-center bg-black/40">
                <h3 className="font-bold">Tailwind CSS</h3>
                <p className="text-sm text-gray-400">Styling</p>
              </div>
              <div className="border border-purple-500/30 rounded-lg p-4 text-center bg-black/40">
                <h3 className="font-bold">TypeScript</h3>
                <p className="text-sm text-gray-400">Type Safety</p>
              </div>
            </div>
          </section>

          <section className="bg-purple-900/20 rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-6 text-gray-300 max-w-2xl mx-auto">
              Whether you're a space enthusiast, a scientist, a developer, or just curious about the cosmos, there's a
              place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Contribute Content
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500/50 text-white hover:bg-purple-500/20">
                Join Our Discord
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
