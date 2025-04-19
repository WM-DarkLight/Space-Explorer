import Link from "next/link"
import { Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/types/content-types"
import { Badge } from "@/components/ui/badge"
import ScrollReveal from "@/components/scroll-reveal"

interface RelatedArticlesProps {
  articles: Article[]
  currentArticleId: string
  topicTitle: string
}

export default function RelatedArticles({ articles, currentArticleId, topicTitle }: RelatedArticlesProps) {
  // Filter out the current article and limit to 3 articles
  const relatedArticles = articles.filter((article) => article.id !== currentArticleId).slice(0, 3)

  if (relatedArticles.length === 0) return null

  return (
    <ScrollReveal direction="up" className="mt-12 border-t border-purple-500/20 pt-8">
      <h3 className="mb-6 text-xl font-bold">More articles about {topicTitle}</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {relatedArticles.map((article, index) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group rounded-lg border border-purple-500/20 bg-black/40 p-4 transition-all hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
          >
            <ScrollReveal delay={index * 100} direction="up">
              <Badge variant="purple" className="mb-2">
                {topicTitle}
              </Badge>
              <h4 className="mb-2 font-bold group-hover:text-purple-400">{article.title}</h4>
              <p className="mb-3 text-sm text-gray-400 line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{formatDate(article.publishedDate)}</span>
              </div>
            </ScrollReveal>
          </Link>
        ))}
      </div>
    </ScrollReveal>
  )
}
