import SpaceGlossary from "@/components/space-glossary"

export default function GlossaryPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Space & Astronomy Glossary</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore definitions and explanations of space and astronomy terms
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <SpaceGlossary />
      </div>
    </div>
  )
}
