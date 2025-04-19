import { getAllTopics } from "@/lib/content-service"
import TopicCard from "@/components/topic-card"

export default async function TopicsPage() {
  const topics = await getAllTopics()

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Explore Topics</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Discover the fascinating world of space and science through our curated topics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            title={topic.title}
            description={topic.description}
            image={topic.imageUrl}
            slug={topic.slug}
            articleCount={topic.articles.length}
          />
        ))}
      </div>
    </div>
  )
}
