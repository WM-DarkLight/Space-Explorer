import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InteractiveSkyMap from "@/components/interactive-sky-map"
import QuizSystem from "@/components/quiz-system"
import SpaceEventsCalendar from "@/components/space-events-calendar"
import SpaceTimeline from "@/components/space-timeline"
import InteractiveDiagram from "@/components/interactive-diagram"
import SpaceCalculators from "@/components/space-calculators"
import ScrollReveal from "@/components/scroll-reveal"

export default function InteractivePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Interactive Tools</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore space and astronomy through our interactive tools and visualizations
        </p>
      </div>

      <Tabs defaultValue="sky-map" className="space-y-8">
        <ScrollReveal>
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="sky-map">Sky Map</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="calculators">Calculators</TabsTrigger>
            </TabsList>
          </div>
        </ScrollReveal>

        <TabsContent value="sky-map" className="space-y-8">
          <ScrollReveal>
            <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
              <h2 className="text-2xl font-bold mb-4">Interactive Sky Map</h2>
              <p className="text-gray-300 mb-6">
                Explore the night sky with our interactive map. Discover stars, constellations, and celestial objects.
                Zoom, pan, and click on objects to learn more about them.
              </p>
              <div className="h-[500px]">
                <InteractiveSkyMap />
              </div>
            </div>
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-8">
          <ScrollReveal>
            <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
              <h2 className="text-2xl font-bold mb-4">Space Quiz System</h2>
              <p className="text-gray-300 mb-6">
                Test your knowledge of space and astronomy with our interactive quiz system. Choose from different
                categories and difficulty levels.
              </p>
              <QuizSystem />
            </div>
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="events" className="space-y-8">
          <ScrollReveal>
            <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
              <h2 className="text-2xl font-bold mb-4">Space Events Calendar</h2>
              <p className="text-gray-300 mb-6">
                Stay up-to-date with upcoming astronomical events, space missions, and celestial phenomena.
              </p>
              <SpaceEventsCalendar />
            </div>
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-8">
          <ScrollReveal>
            <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
              <h2 className="text-2xl font-bold mb-4">Space Exploration Timeline</h2>
              <p className="text-gray-300 mb-6">
                Explore the history of space exploration from the first satellite to the latest missions.
              </p>
              <SpaceTimeline />
            </div>
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="calculators" className="space-y-8">
          <ScrollReveal>
            <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
              <h2 className="text-2xl font-bold mb-4">Space Calculators</h2>
              <p className="text-gray-300 mb-6">
                Use our calculators to explore orbital mechanics, rocket equations, and more.
              </p>
              <SpaceCalculators />
            </div>
          </ScrollReveal>
        </TabsContent>
      </Tabs>

      <div className="mt-12 space-y-8">
        <ScrollReveal>
          <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-4">Interactive Diagrams</h2>
            <p className="text-gray-300 mb-6">
              Explore space concepts through interactive diagrams that you can manipulate and explore.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InteractiveDiagram
                type="solar-system"
                title="Solar System Model"
                description="An interactive model of our solar system showing the planets orbiting the Sun. Zoom, pan, and interact with the planets to learn more about them."
              />
              <InteractiveDiagram
                type="black-hole"
                title="Black Hole Visualization"
                description="Visualize how a black hole warps spacetime and affects light and matter around it. See the accretion disk and event horizon in action."
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
