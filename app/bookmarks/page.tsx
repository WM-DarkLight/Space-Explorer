import BookmarkSystem from "@/components/bookmark-system"

export default function BookmarksPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Your Bookmarks</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Access your saved articles and topics</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <BookmarkSystem />
      </div>
    </div>
  )
}
