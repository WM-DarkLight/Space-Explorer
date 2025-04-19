import Link from "next/link"
import { Calendar, User } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface FeaturedArticleProps {
  title: string
  excerpt: string
  author: string
  date: string
  topic: string
  slug: string
}

export default function FeaturedArticle({ title, excerpt, author, date, topic, slug }: FeaturedArticleProps) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-black/40 transition-all hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
    >
      <div className="p-5">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-purple-500/20 text-purple-400">
            {topic}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{title}</h3>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center text-gray-400 text-xs space-x-4">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
