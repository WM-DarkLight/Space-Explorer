import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LicensePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 max-w-4xl">
      <Link
        href="/"
        className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-all hover:translate-x-[-4px]"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
          License
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">MIT License</h2>
          <div className="bg-black/30 p-6 rounded-lg border border-purple-500/20">
            <p>Copyright (c) {new Date().getFullYear()} Space Explorer</p>
            <p className="mt-4">
              Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
              associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction,
              including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
              and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
              subject to the following conditions:
            </p>
            <p className="mt-4">
              The above copyright notice and this permission notice shall be included in all copies or substantial
              portions of the Software.
            </p>
            <p className="mt-4">
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
              BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
              OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
              CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Content License</h2>
          <p>
            Unless otherwise noted, the content on this website is licensed under a{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              Creative Commons Attribution-ShareAlike 4.0 International License
            </a>
            .
          </p>
          <p className="mt-4">
            This means you are free to share (copy and redistribute the material in any medium or format) and adapt
            (remix, transform, and build upon the material) for any purpose, even commercially, under the following
            terms:
          </p>
          <ul className="mt-4 list-disc pl-6">
            <li>
              <strong>Attribution</strong> — You must give appropriate credit, provide a link to the license, and
              indicate if changes were made.
            </li>
            <li>
              <strong>ShareAlike</strong> — If you remix, transform, or build upon the material, you must distribute
              your contributions under the same license as the original.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Third-Party Attributions</h2>
          <p>Space Explorer uses the following third-party libraries and resources:</p>

          <h3 className="text-xl font-bold mt-6 mb-2">Software Libraries</h3>
          <ul className="list-disc pl-6">
            <li>
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Next.js
              </a>{" "}
              — Licensed under the MIT License
            </li>
            <li>
              <a
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                React
              </a>{" "}
              — Licensed under the MIT License
            </li>
            <li>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Tailwind CSS
              </a>{" "}
              — Licensed under the MIT License
            </li>
            <li>
              <a
                href="https://lucide.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Lucide Icons
              </a>{" "}
              — Licensed under the ISC License
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">Images and Media</h3>
          <p>
            Many of the space images used on this site are courtesy of NASA and are in the public domain unless
            otherwise noted.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p>
            If you have any questions about the licensing of Space Explorer or its content, please contact us at{" "}
            <a href="mailto:legal@spaceexplorer.com" className="text-purple-400 hover:text-purple-300">
              legal@spaceexplorer.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
