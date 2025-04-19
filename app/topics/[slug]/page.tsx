import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getTopicBySlug } from "@/lib/content-service"
import { notFound } from "next/navigation"
import FeaturedArticle from "@/components/featured-article"

interface TopicPageProps {
  params: {
    slug: string
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const topic = await getTopicBySlug(params.slug)

  if (!topic) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <Link href="/topics" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Topics
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{topic.title}</h1>
        <p className="text-xl text-gray-300 max-w-2xl">{topic.description}</p>
      </div>

      <div className="space-y-8">
        {topic.articles.length > 0 ? (
          topic.articles.map((article) => (
            <FeaturedArticle
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              date={article.publishedDate}
              topic={topic.title}
              slug={article.slug}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No articles found for this topic.</p>
          </div>
        )}
      </div>
    </div>
  )
}
