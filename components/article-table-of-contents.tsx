"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { List, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TocItem {
  id: string
  text: string
  level: number
}

interface ArticleTableOfContentsProps {
  content: string
}

export default function ArticleTableOfContents({ content }: ArticleTableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Parse the markdown content to extract headings
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const headings: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2]
      const id = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-")

      if (level <= 3) {
        // Only include h1, h2, h3
        headings.push({ id, text, level })
      }
    }

    setToc(headings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      toc.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [toc])

  if (toc.length === 0) return null

  return (
    <div className="absolute top-0 right-0 w-64 -mr-72">
      <div className="sticky top-24">
        <div className="bg-black/80 rounded-lg border border-purple-500/20 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between p-3 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <List className="h-4 w-4 text-purple-400" />
              <h3 className="font-bold text-purple-400">Contents</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // In a real app, this would add the current article to bookmarks
                  const event = new CustomEvent("bookmark-added", {
                    detail: { message: "Article bookmarked!" },
                  })
                  document.dispatchEvent(event)
                }}
                className="h-7 w-7 p-0 text-gray-400 hover:text-purple-400"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="h-7 w-7 p-0 text-gray-400 hover:text-purple-400"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </Button>
            </div>
          </div>

          {isOpen && (
            <nav className="p-3 max-h-[60vh] overflow-y-auto">
              <ul className="space-y-2 text-sm">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={cn("transition-all", item.level === 1 ? "pl-0" : item.level === 2 ? "pl-3" : "pl-6")}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        const element = document.getElementById(item.id)
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                          window.history.pushState(null, "", `#${item.id}`)
                        }
                      }}
                      className={cn(
                        "block truncate rounded px-2 py-1 transition-all hover:bg-purple-500/10 hover:text-purple-400",
                        activeId === item.id ? "bg-purple-500/20 text-purple-400" : "text-gray-300",
                      )}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}
