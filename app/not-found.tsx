import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="text-9xl font-bold text-purple-600 opacity-20">404</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
            Lost in Space
          </div>
        </div>

        <h1 className="text-3xl font-bold mt-4">Page Not Found</h1>
        <p className="text-xl text-gray-400 max-w-md mx-auto">
          The cosmic coordinates you're looking for don't seem to exist in our universe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Button>
          <Button variant="outline" className="border-purple-500/50 text-white hover:bg-purple-500/20">
            <Search className="mr-2 h-4 w-4" />
            Search Topics
          </Button>
        </div>
      </div>
    </div>
  )
}
