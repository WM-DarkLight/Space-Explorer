import Link from "next/link"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopicCardProps {
  title: string
  description: string
  slug: string
  articleCount: number
  className?: string
}

export default function TopicCard({ title, description, slug, articleCount, className }: TopicCardProps) {
  return (
    <Link
      href={`/topics/${slug}`}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-purple-500/20 bg-black/40 transition-all hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]",
        className,
      )}
    >
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center text-purple-400 text-sm">
          <FileText className="h-4 w-4 mr-2" />
          <span>{articleCount} articles</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-purple-600 to-purple-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  )
}
