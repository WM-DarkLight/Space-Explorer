"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import ScrollReveal from "@/components/scroll-reveal"

interface SearchResult {
  id: string
  title: string
  type: "article" | "topic" | "glossary" | "event"
  category?: string
  excerpt?: string
  url: string
  date?: string
  relevance: number
}

export default function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" })
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Add this useEffect hook after the existing state declarations to fetch categories from the API
  useEffect(() => {
    // This will run only on client-side
    if (typeof window !== "undefined") {
      // We could fetch categories dynamically here if needed
      // For now, we'll use the static categories defined above
    }
  }, [])

  // Available filters
  const contentTypes = [
    { value: "article", label: "Articles" },
    { value: "topic", label: "Topics" },
    { value: "glossary", label: "Glossary Terms" },
    { value: "event", label: "Space Events" },
  ]

  const categories = [
    { value: "black-holes", label: "Black Holes" },
    { value: "dark-matter", label: "Dark Matter" },
    { value: "galaxies", label: "Galaxies" },
    { value: "planets", label: "Planets" },
    { value: "stars", label: "Stars" },
    { value: "space-missions", label: "Space Missions" },
    { value: "astronomy", label: "Astronomy" },
  ]

  // Toggle content type filter
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  // Toggle category filter
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedCategories([])
    setDateRange({ from: "", to: "" })
  }

  // Handle search
  const handleSearch = () => {
    if (
      !searchTerm.trim() &&
      selectedTypes.length === 0 &&
      selectedCategories.length === 0 &&
      !dateRange.from &&
      !dateRange.to
    ) {
      setResults([])
      setHasSearched(false)
      return
    }

    setIsSearching(true)
    setHasSearched(true)

    // Fetch all topics and articles
    fetch("/api/search")
      .then((response) => response.json())
      .then((data) => {
        let filteredResults = [...data]

        // Filter by search term
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase()
          filteredResults = filteredResults.filter(
            (result) =>
              result.title.toLowerCase().includes(term) ||
              (result.excerpt && result.excerpt.toLowerCase().includes(term)),
          )
        }

        // Filter by content type
        if (selectedTypes.length > 0) {
          filteredResults = filteredResults.filter((result) => selectedTypes.includes(result.type))
        }

        // Filter by category
        if (selectedCategories.length > 0) {
          filteredResults = filteredResults.filter(
            (result) => result.category && selectedCategories.includes(result.category),
          )
        }

        // Filter by date range
        if (dateRange.from) {
          filteredResults = filteredResults.filter(
            (result) => result.date && new Date(result.date) >= new Date(dateRange.from),
          )
        }

        if (dateRange.to) {
          filteredResults = filteredResults.filter(
            (result) => result.date && new Date(result.date) <= new Date(dateRange.to),
          )
        }

        // Sort by relevance (simple implementation)
        filteredResults = filteredResults.map((result) => {
          let relevance = 0.5 // Base relevance

          // Increase relevance if title contains search term
          if (searchTerm && result.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            relevance += 0.3
          }

          // Increase relevance if it's a direct category match
          if (selectedCategories.length > 0 && result.category && selectedCategories.includes(result.category)) {
            relevance += 0.2
          }

          return { ...result, relevance: Math.min(relevance, 1) }
        })

        // Sort by relevance
        filteredResults.sort((a, b) => b.relevance - a.relevance)

        setResults(filteredResults)
        setIsSearching(false)
      })
      .catch((error) => {
        console.error("Error fetching search data:", error)
        setIsSearching(false)
        setResults([])
      })
  }

  return (
    <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Search className="h-5 w-5 text-purple-400 mr-2" />
        <h2 className="text-xl font-bold">Advanced Search</h2>
      </div>

      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for articles, topics, terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 bg-black/40 border-purple-500/30"
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                (searchTerm.trim() ||
                  selectedTypes.length > 0 ||
                  selectedCategories.length > 0 ||
                  dateRange.from ||
                  dateRange.to)
              ) {
                handleSearch()
              }
            }}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 ${
              showFilters || selectedTypes.length > 0 || selectedCategories.length > 0 || dateRange.from || dateRange.to
                ? "text-purple-400 border-purple-400"
                : "text-gray-400 border-gray-600"
            }`}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <ScrollReveal className="p-4 bg-black/60 rounded-lg border border-purple-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filter Results</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 text-gray-400 hover:text-purple-400"
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Content Type</h4>
                <div className="flex flex-wrap gap-2">
                  {contentTypes.map((type) => (
                    <Badge
                      key={type.value}
                      variant={selectedTypes.includes(type.value) ? "purple" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleType(type.value)}
                    >
                      {type.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category.value}
                      variant={selectedCategories.includes(category.value) ? "purple" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleCategory(category.value)}
                    >
                      {category.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Date Range</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">From</label>
                    <Input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                      className="bg-black/40 border-purple-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">To</label>
                    <Input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                      className="bg-black/40 border-purple-500/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Search button */}
        <Button
          onClick={() => {
            if (
              searchTerm.trim() ||
              selectedTypes.length > 0 ||
              selectedCategories.length > 0 ||
              dateRange.from ||
              dateRange.to
            ) {
              handleSearch()
            }
          }}
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>

        {/* Active filters display */}
        {(selectedTypes.length > 0 || selectedCategories.length > 0 || dateRange.from || dateRange.to) && (
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <span className="text-gray-400">Active filters:</span>
            {selectedTypes.map((type) => (
              <Badge key={type} variant="purple" className="flex items-center gap-1">
                {contentTypes.find((t) => t.value === type)?.label}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedTypes(selectedTypes.filter((t) => t !== type))}
                />
              </Badge>
            ))}
            {selectedCategories.map((category) => (
              <Badge key={category} variant="purple" className="flex items-center gap-1">
                {categories.find((c) => c.value === category)?.label}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                />
              </Badge>
            ))}
            {dateRange.from && (
              <Badge variant="purple" className="flex items-center gap-1">
                From: {dateRange.from}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setDateRange({ ...dateRange, from: "" })} />
              </Badge>
            )}
            {dateRange.to && (
              <Badge variant="purple" className="flex items-center gap-1">
                To: {dateRange.to}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setDateRange({ ...dateRange, to: "" })} />
              </Badge>
            )}
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">
                {isSearching ? "Searching..." : `${results.length} results for "${searchTerm}"`}
              </h3>
              {results.length > 0 && (
                <div className="text-sm text-gray-400">
                  Sorted by: <span className="text-purple-400">Relevance</span>
                </div>
              )}
            </div>

            {isSearching ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <ScrollReveal key={result.id}>
                    <Link
                      href={result.url}
                      className="block p-4 rounded-lg border border-purple-500/20 bg-black/20 hover:bg-black/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={
                            result.type === "article"
                              ? "purple"
                              : result.type === "topic"
                                ? "outline"
                                : result.type === "glossary"
                                  ? "secondary"
                                  : "default"
                          }
                          className="capitalize text-xs"
                        >
                          {result.type}
                        </Badge>
                        {result.category && (
                          <Badge variant="outline" className="text-xs">
                            {categories.find((c) => c.value === result.category)?.label || result.category}
                          </Badge>
                        )}
                        {result.date && <span className="text-xs text-gray-400">{result.date}</span>}
                      </div>

                      <h3 className="text-lg font-medium hover:text-purple-400 transition-colors">{result.title}</h3>

                      {result.excerpt && <p className="text-sm text-gray-300 mt-1 line-clamp-2">{result.excerpt}</p>}

                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-gray-400">Relevance: {Math.round(result.relevance * 100)}%</div>
                        <div className="text-purple-400 text-sm flex items-center">
                          View
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-purple-500/30 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-4">
                  <Search className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search terms or filters</p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-purple-500/30 hover:bg-purple-500/20"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
