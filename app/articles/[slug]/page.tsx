import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import { getArticleBySlug } from "@/lib/content-service"
import { notFound } from "next/navigation"
import { formatDate, calculateReadingTime } from "@/lib/utils"
import Markdown from "@/components/markdown"
import { allTopics } from "@/content/topics"
import ArticleTableOfContents from "@/components/article-table-of-contents"
import RelatedArticles from "@/components/related-articles"
import ScrollReveal from "@/components/scroll-reveal"
import NewsletterSignup from "@/components/newsletter-signup"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import AnimatedText from "@/components/animated-text"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // Find which topic this article belongs to
  const topicForArticle = allTopics.find((topic) => topic.articles.some((a) => a.slug === params.slug))
  const readingTime = calculateReadingTime(article.content)

  return (
    <TooltipProvider delayDuration={0}>
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 max-w-4xl">
        <Link
          href="/articles"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-all hover:translate-x-[-4px]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <ScrollReveal>
            <div className="mb-8">
              {topicForArticle && (
                <Link
                  href={`/topics/${topicForArticle.slug}`}
                  className="inline-block px-3 py-1 text-sm font-medium rounded bg-purple-500/20 text-purple-400 mb-4 no-underline hover:bg-purple-500/30 transition-colors"
                >
                  {topicForArticle.title}
                </Link>
              )}

              <h1 className="text-4xl md:text-5xl font-bold mb-6 not-prose">
                <AnimatedText text={article.title} speed={30} />
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-8 not-prose">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(article.publishedDate)}</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{readingTime} min read</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Estimated reading time</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Main content */}
            <div className="article-content">
              <Markdown content={article.content} />
            </div>

            {/* Table of contents - positioned on the right side */}
            <div className="hidden lg:block">
              <ArticleTableOfContents content={article.content} />
            </div>

            <div className="mt-12 pt-6 border-t border-purple-500/20">
              <ScrollReveal>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="purple">Space</Badge>
                  <Badge variant="purple">Science</Badge>
                  <Badge variant="purple">{topicForArticle?.title || "General"}</Badge>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <p>Last updated: {formatDate(article.publishedDate)}</p>
                </div>

                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
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
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
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
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
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
                      <path d="M4 11a9 9 0 0 1 9 9"></path>
                      <path d="M4 4a16 16 0 0 1 16 16"></path>
                      <circle cx="5" cy="19" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </article>

        {topicForArticle && (
          <RelatedArticles
            articles={topicForArticle.articles}
            currentArticleId={article.id}
            topicTitle={topicForArticle.title}
          />
        )}

        <div className="mt-16">
          <NewsletterSignup />
        </div>
      </div>
    </TooltipProvider>
  )
}
