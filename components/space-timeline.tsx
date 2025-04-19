"use client"

import { useState, useRef, useEffect } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ScrollReveal from "@/components/scroll-reveal"

interface TimelineEvent {
  id: string
  title: string
  date: string
  description: string
  image?: string
  category: "mission" | "discovery" | "human-spaceflight" | "technology" | "other"
  agency?: string
}

export default function SpaceTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [filteredCategories, setFilteredCategories] = useState<string[]>([])
  const [filteredAgencies, setFilteredAgencies] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [decades, setDecades] = useState<string[]>([])
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Categories for filtering
  const categories = [
    { value: "mission", label: "Space Missions", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { value: "discovery", label: "Discoveries", color: "bg-green-500/20 text-green-400 border-green-500/30" },
    {
      value: "human-spaceflight",
      label: "Human Spaceflight",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
    { value: "technology", label: "Technology", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    { value: "other", label: "Other", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  ]

  // Agencies for filtering
  const agencies = [
    { value: "nasa", label: "NASA" },
    { value: "esa", label: "ESA" },
    { value: "roscosmos", label: "Roscosmos" },
    { value: "spacex", label: "SpaceX" },
    { value: "cnsa", label: "CNSA" },
    { value: "isro", label: "ISRO" },
    { value: "other", label: "Other" },
  ]

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchEvents = () => {
      // Sample timeline events
      const sampleEvents: TimelineEvent[] = [
        {
          id: "e1",
          title: "First Satellite: Sputnik 1",
          date: "1957-10-04",
          description:
            "The Soviet Union launched Sputnik 1, the first artificial Earth satellite. The successful launch shocked the world and began the Space Race between the USSR and the USA.",
          category: "mission",
          agency: "roscosmos",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e2",
          title: "First Human in Space: Yuri Gagarin",
          date: "1961-04-12",
          description:
            "Soviet cosmonaut Yuri Gagarin became the first human to journey into outer space and orbit the Earth in Vostok 1.",
          category: "human-spaceflight",
          agency: "roscosmos",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e3",
          title: "First American in Space: Alan Shepard",
          date: "1961-05-05",
          description:
            "Alan Shepard became the first American in space aboard Freedom 7, as part of NASA's Mercury program.",
          category: "human-spaceflight",
          agency: "nasa",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e4",
          title: "First Woman in Space: Valentina Tereshkova",
          date: "1963-06-16",
          description: "Soviet cosmonaut Valentina Tereshkova became the first woman to fly in space aboard Vostok 6.",
          category: "human-spaceflight",
          agency: "roscosmos",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e5",
          title: "First Moon Landing: Apollo 11",
          date: "1969-07-20",
          description:
            "NASA's Apollo 11 mission successfully landed astronauts Neil Armstrong and Buzz Aldrin on the Moon. Armstrong became the first person to step onto the lunar surface.",
          category: "human-spaceflight",
          agency: "nasa",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e6",
          title: "First Space Station: Salyut 1",
          date: "1971-04-19",
          description: "The Soviet Union launched Salyut 1, the first space station to orbit Earth.",
          category: "technology",
          agency: "roscosmos",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e7",
          title: "Voyager 1 Launch",
          date: "1977-09-05",
          description:
            "NASA launched Voyager 1, which would go on to become the first human-made object to enter interstellar space.",
          category: "mission",
          agency: "nasa",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e8",
          title: "First Space Shuttle Launch: Columbia",
          date: "1981-04-12",
          description:
            "NASA launched the first space shuttle, Columbia, marking the beginning of the Space Shuttle program.",
          category: "technology",
          agency: "nasa",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e9",
          title: "Hubble Space Telescope Launch",
          date: "1990-04-24",
          description:
            "NASA launched the Hubble Space Telescope, which has provided unprecedented deep space images and greatly advanced our understanding of the universe.",
          category: "technology",
          agency: "nasa",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e10",
          title: "International Space Station Construction Begins",
          date: "1998-11-20",
          description:
            "The first module of the International Space Station (ISS), Zarya, was launched, beginning the construction of the largest human-made structure in space.",
          category: "technology",
          agency: "other",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e11",
          title: "Mars Rover Spirit Landing",
          date: "2004-01-04",
          description:
            "NASA's Mars Exploration Rover Spirit successfully landed on Mars, beginning its mission to study the Martian surface and geology.",
          category: "mission",
          agency: "nasa",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e12",
          title: "Pluto Reclassified as Dwarf Planet",
          date: "2006-08-24",
          description:
            "The International Astronomical Union redefined the definition of a planet, resulting in Pluto being reclassified as a dwarf planet.",
          category: "discovery",
          agency: "other",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e13",
          title: "First SpaceX Falcon 1 Successful Launch",
          date: "2008-09-28",
          description: "SpaceX's Falcon 1 became the first privately developed liquid-fuel rocket to reach orbit.",
          category: "technology",
          agency: "spacex",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e14",
          title: "Curiosity Rover Landing on Mars",
          date: "2012-08-06",
          description: "NASA's Curiosity rover successfully landed on Mars using a novel sky crane landing system.",
          category: "mission",
          agency: "nasa",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e15",
          title: "First Image of a Black Hole",
          date: "2019-04-10",
          description:
            "The Event Horizon Telescope team released the first direct image of a black hole, located in the center of galaxy M87.",
          category: "discovery",
          agency: "other",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e16",
          title: "First Commercial Crewed Spaceflight: Crew Dragon Demo-2",
          date: "2020-05-30",
          description:
            "SpaceX's Crew Dragon spacecraft carried NASA astronauts to the ISS, marking the first crewed orbital spaceflight by a private company.",
          category: "human-spaceflight",
          agency: "spacex",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e17",
          title: "James Webb Space Telescope Launch",
          date: "2021-12-25",
          description:
            "The James Webb Space Telescope, the largest and most powerful space telescope ever built, was launched.",
          category: "technology",
          agency: "nasa",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "e18",
          title: "DART Mission Impact",
          date: "2022-09-26",
          description:
            "NASA's Double Asteroid Redirection Test (DART) spacecraft successfully impacted the asteroid Dimorphos, demonstrating a potential planetary defense technique.",
          category: "mission",
          agency: "nasa",
          image: "/placeholder.svg?height=200&width=300",
        },
      ]

      // Sort events by date
      const sortedEvents = sampleEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      setEvents(sortedEvents)

      // Extract decades from events
      const allDecades = sortedEvents.map((event) => {
        const year = new Date(event.date).getFullYear()
        return `${Math.floor(year / 10) * 10}s`
      })

      // Get unique decades
      const uniqueDecades = Array.from(new Set(allDecades)).sort()
      setDecades(uniqueDecades)

      // Set initial selected decade to the earliest
      if (uniqueDecades.length > 0) {
        setSelectedDecade(uniqueDecades[0])
      }
    }

    fetchEvents()
  }, [])

  // Filter events based on selected filters
  const filteredEvents = events.filter((event) => {
    // Filter by decade if selected
    if (selectedDecade) {
      const year = new Date(event.date).getFullYear()
      const decade = `${Math.floor(year / 10) * 10}s`
      if (decade !== selectedDecade) return false
    }

    // Filter by category if any selected
    if (filteredCategories.length > 0 && !filteredCategories.includes(event.category)) {
      return false
    }

    // Filter by agency if any selected
    if (filteredAgencies.length > 0 && !filteredAgencies.includes(event.agency || "other")) {
      return false
    }

    return true
  })

  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    if (filteredCategories.includes(category)) {
      setFilteredCategories(filteredCategories.filter((c) => c !== category))
    } else {
      setFilteredCategories([...filteredCategories, category])
    }
  }

  // Toggle agency filter
  const toggleAgencyFilter = (agency: string) => {
    if (filteredAgencies.includes(agency)) {
      setFilteredAgencies(filteredAgencies.filter((a) => a !== agency))
    } else {
      setFilteredAgencies([...filteredAgencies, agency])
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  // Get badge color for category
  const getCategoryBadgeColor = (category: string) => {
    const cat = categories.find((c) => c.value === category)
    return cat ? cat.color : "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  // Scroll to previous/next decade
  const scrollToDecade = (decade: string) => {
    setSelectedDecade(decade)
  }

  return (
    <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">Space Exploration Timeline</h2>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="border-purple-500/30 hover:bg-purple-500/20"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      {/* Decade navigation */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {decades.map((decade) => (
            <Button
              key={decade}
              variant={selectedDecade === decade ? "default" : "outline"}
              size="sm"
              onClick={() => scrollToDecade(decade)}
              className={
                selectedDecade === decade
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-purple-500/30 hover:bg-purple-500/20"
              }
            >
              {decade}
            </Button>
          ))}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-black/60 rounded-lg border border-purple-500/10">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium mb-2">Filter by category:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category.value}
                    className={`cursor-pointer ${
                      filteredCategories.includes(category.value)
                        ? category.color
                        : "bg-gray-800/50 text-gray-400 border-gray-700"
                    }`}
                    onClick={() => toggleCategoryFilter(category.value)}
                  >
                    {category.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Filter by agency:</h3>
              <div className="flex flex-wrap gap-2">
                {agencies.map((agency) => (
                  <Badge
                    key={agency.value}
                    className={`cursor-pointer ${
                      filteredAgencies.includes(agency.value)
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                        : "bg-gray-800/50 text-gray-400 border-gray-700"
                    }`}
                    onClick={() => toggleAgencyFilter(agency.value)}
                  >
                    {agency.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {(filteredCategories.length > 0 || filteredAgencies.length > 0) && (
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setFilteredCategories([])
                setFilteredAgencies([])
              }}
              className="mt-2 text-xs text-purple-400 h-auto p-0"
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}

      {/* Timeline */}
      <div className="relative" ref={timelineRef}>
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-500/30" />

        {filteredEvents.length > 0 ? (
          <div className="space-y-8 ml-8">
            {filteredEvents.map((event, index) => (
              <ScrollReveal key={event.id} delay={index * 100} direction="up">
                <div
                  className={`relative pb-8 ${
                    selectedEvent?.id === event.id
                      ? "bg-purple-500/10 rounded-lg p-4 -ml-4 border border-purple-500/30"
                      : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-10 mt-1.5">
                    <div className="h-4 w-4 rounded-full bg-purple-600 border-4 border-black" />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <Badge className="mb-2 bg-gray-800 text-gray-300 border-gray-700">
                            {formatDate(event.date)}
                          </Badge>
                          <h3 className="text-lg font-bold">{event.title}</h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge className={getCategoryBadgeColor(event.category)}>
                            {categories.find((c) => c.value === event.category)?.label || event.category}
                          </Badge>

                          {event.agency && (
                            <Badge variant="outline">
                              {agencies.find((a) => a.value === event.agency)?.label || event.agency}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm">{event.description}</p>

                      {selectedEvent?.id !== event.id && (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => setSelectedEvent(event)}
                          className="mt-2 text-purple-400 p-0 h-auto"
                        >
                          View details
                        </Button>
                      )}
                    </div>

                    {selectedEvent?.id === event.id && event.image && (
                      <div className="md:w-1/3">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="rounded-lg w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {selectedEvent?.id === event.id && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedEvent(null)}
                      className="mt-4 border-purple-500/30 hover:bg-purple-500/20"
                    >
                      Close details
                    </Button>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="ml-8 py-8 text-center">
            <p className="text-gray-400">No events match your selected filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
