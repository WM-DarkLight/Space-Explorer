import { Skeleton } from "@/components/ui/skeleton"

export default function ArticleLoading() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 max-w-4xl">
      {/* Back button skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-24" />
      </div>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-8">
          {/* Topic badge skeleton */}
          <Skeleton className="h-6 w-24 mb-4" />

          {/* Title skeleton */}
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-3/4 mb-6" />

          {/* Article metadata skeleton */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        {/* Article content skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />

          <div className="py-4">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>

          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />

          <div className="py-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>

        {/* Tags and share section skeleton */}
        <div className="mt-12 pt-6 border-t border-purple-500/20">
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>

          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-40" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </article>

      {/* Related articles skeleton */}
      <div className="mt-16">
        <Skeleton className="h-10 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>

      {/* Newsletter signup skeleton */}
      <div className="mt-16">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  )
}
