import Link from "next/link"
import { getAllTopics } from "@/lib/content-service"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, ArrowRight, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { formatDate } from "@/lib/utils"
import ScrollReveal from "@/components/scroll-reveal"
import type { Article } from "@/types/content-types"

export default async function ArticlesPage() {
  // Get all topics
  const topics = await getAllTopics()

  // Collect all articles from all topics
  const allArticles: (Article & { topicSlug: string; topicTitle: string })[] = []

  topics.forEach((topic) => {
    topic.articles.forEach((article) => {
      allArticles.push({
        ...article,
        topicSlug: topic.slug,
        topicTitle: topic.title,
      })
    })
  })

  // Sort articles by date (newest first)
  allArticles.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Articles</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore our collection of articles on space and astronomy
        </p>
      </div>

      {/* Search and filter */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative">
          <Input type="text" placeholder="Search articles..." className="pl-10 py-6 bg-black/40 border-purple-500/30" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Button
            variant="outline"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 border-gray-600"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-sm text-gray-400 text-center">
          <p>{allArticles.length} articles available</p>
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allArticles.map((article, index) => (
            <ScrollReveal key={article.id} delay={index * 100} direction="up">
              <Link
                href={`/articles/${article.slug}`}
                className="group block rounded-lg border border-purple-500/20 bg-black/40 transition-all hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="purple">{article.topicTitle}</Badge>
                    <span className="text-xs text-gray-400">{formatDate(article.publishedDate)}</span>
                  </div>

                  <h2 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400 text-xs">
                      <User className="h-3 w-3 mr-1" />
                      <span>{article.author}</span>
                    </div>

                    <div className="text-purple-400 text-sm flex items-center">
                      Read article
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
