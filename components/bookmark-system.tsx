"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark, Trash2, Clock, Calendar, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import ScrollReveal from "@/components/scroll-reveal"

interface BookmarkItem {
  id: string
  title: string
  url: string
  type: "article" | "topic"
  category?: string
  dateAdded: string
}

export default function BookmarkSystem() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load bookmarks from localStorage
    const loadBookmarks = () => {
      setLoading(true)
      try {
        const savedBookmarks = localStorage.getItem("space-explorer-bookmarks")
        if (savedBookmarks) {
          setBookmarks(JSON.parse(savedBookmarks))
        } else {
          // Sample bookmarks for demonstration
          const sampleBookmarks: BookmarkItem[] = [
            {
              id: "bk1",
              title: "The Event Horizon: Where Physics Breaks Down",
              url: "/articles/event-horizon-physics",
              type: "article",
              category: "black-holes",
              dateAdded: new Date().toISOString(),
            },
            {
              id: "bk2",
              title: "Black Holes",
              url: "/topics/black-holes",
              type: "topic",
              dateAdded: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            },
            {
              id: "bk3",
              title: "Mapping Dark Matter in the Cosmos",
              url: "/articles/mapping-dark-matter",
              type: "article",
              category: "dark-matter",
              dateAdded: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            },
          ]
          setBookmarks(sampleBookmarks)
          localStorage.setItem("space-explorer-bookmarks", JSON.stringify(sampleBookmarks))
        }
      } catch (error) {
        console.error("Error loading bookmarks:", error)
      }
      setLoading(false)
    }

    loadBookmarks()
  }, [])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("space-explorer-bookmarks", JSON.stringify(bookmarks))
    }
  }, [bookmarks, loading])

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))
  }

  const clearAllBookmarks = () => {
    if (confirm("Are you sure you want to remove all bookmarks?")) {
      setBookmarks([])
    }
  }

  // Filter bookmarks based on search term
  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bookmark.category && bookmark.category.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Bookmark className="h-5 w-5 text-purple-400 mr-2" />
          <h2 className="text-xl font-bold">My Bookmarks</h2>
        </div>

        {bookmarks.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllBookmarks}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {bookmarks.length > 0 ? (
        <>
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/40 border-purple-500/30"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {filteredBookmarks.length > 0 ? (
            <div className="space-y-4">
              {filteredBookmarks.map((bookmark, index) => (
                <ScrollReveal key={bookmark.id} delay={index * 100} direction="up">
                  <div className="flex items-start justify-between p-4 rounded-lg border border-purple-500/20 bg-black/20 hover:bg-black/40 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={bookmark.type === "article" ? "purple" : "outline"}
                          className="capitalize text-xs"
                        >
                          {bookmark.type}
                        </Badge>
                        {bookmark.category && (
                          <Badge variant="outline" className="text-xs">
                            {bookmark.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                        )}
                      </div>

                      <Link href={bookmark.url} className="text-lg font-medium hover:text-purple-400 transition-colors">
                        {bookmark.title}
                      </Link>

                      <div className="flex items-center text-xs text-gray-400 mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Added </span>
                        <Calendar className="h-3 w-3 mx-1" />
                        <span>{formatDate(bookmark.dateAdded)}</span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBookmark(bookmark.id)}
                      className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No bookmarks match your search.</p>
              <Button variant="link" onClick={() => setSearchTerm("")} className="text-purple-400 mt-2">
                Clear search
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 border border-dashed border-purple-500/30 rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-4">
            <Bookmark className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No bookmarks yet</h3>
          <p className="text-gray-400 mb-4">Save articles and topics to your bookmarks for easy access later.</p>
          <Link href="/topics">
            <Button className="bg-purple-600 hover:bg-purple-700">Browse Topics</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
