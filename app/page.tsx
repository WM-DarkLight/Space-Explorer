import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import TopicCard from "@/components/topic-card"
import FeaturedArticle from "@/components/featured-article"
import { getAllTopics, getFeaturedArticles } from "@/lib/content-service"
import ScrollReveal from "@/components/scroll-reveal"
import AnimatedText from "@/components/animated-text"
import NewsletterSignup from "@/components/newsletter-signup"
import AdvancedSearch from "@/components/advanced-search"
import DailySpaceFact from "@/components/daily-space-fact"

export default async function HomePage() {
  const topics = await getAllTopics()
  const featuredArticles = await getFeaturedArticles(2)

  // Get the first 3 topics for the featured section
  const featuredTopics = topics.slice(0, 3)

  return (
    <div className="relative min-h-screen">
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 flex flex-col items-center justify-center text-center">
          <ScrollReveal className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-300/30 bg-purple-500/10 text-purple-300 mb-4">
              <Star className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Explore the cosmos</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">
              <AnimatedText text="Discover the Wonders of Space" speed={40} />
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your journey through black holes, galaxies, dark matter, and the mysteries of our universe starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/topics">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 transition-all hover:scale-105">
                  Explore Topics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contribute">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50 text-white hover:bg-purple-500/20 transition-all hover:scale-105"
                >
                  Contribute
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Search Section */}
        <section className="py-10 px-4 sm:px-6">
          <ScrollReveal className="max-w-4xl mx-auto">
            <AdvancedSearch />
          </ScrollReveal>
        </section>

        {/* Featured Topics */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Featured Topics</h2>
              <Link href="/topics" className="text-purple-400 hover:text-purple-300 flex items-center group">
                View all topics
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTopics.map((topic, index) => (
                <ScrollReveal key={topic.id} delay={index * 100} direction="up">
                  <TopicCard
                    title={topic.title}
                    description={topic.description}
                    slug={topic.slug}
                    articleCount={topic.articles.length}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-transparent to-purple-900/20">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Latest Articles</h2>
              <Link href="/articles" className="text-purple-400 hover:text-purple-300 flex items-center group">
                View all articles
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => {
                // Find the topic this article belongs to
                const topicForArticle = topics.find((topic) => topic.articles.some((a) => a.id === article.id))

                return (
                  <ScrollReveal key={article.id} delay={index * 150} direction="up">
                    <FeaturedArticle
                      title={article.title}
                      excerpt={article.excerpt}
                      author={article.author}
                      date={article.publishedDate}
                      topic={topicForArticle?.title || "General"}
                      slug={article.slug}
                    />
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Daily Space Fact Section */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <DailySpaceFact />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <NewsletterSignup />
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20 px-4 sm:px-6">
          <ScrollReveal direction="up" className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-300 mb-8">
              Space Explorer is an open-source project. Contribute articles, fix bugs, or suggest improvements on
              GitHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://github.com/space-explorer/space-explorer" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 transition-all hover:scale-105">
                  Contribute on GitHub
                </Button>
              </Link>
              <Link href="/contribute">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50 text-white hover:bg-purple-500/20 transition-all hover:scale-105"
                >
                  Read Contribution Guide
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </div>
  )
}
