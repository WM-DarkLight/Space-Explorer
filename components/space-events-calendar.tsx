"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Filter, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ScrollReveal from "@/components/scroll-reveal"

interface SpaceEvent {
  id: string
  title: string
  date: string
  type: "meteor-shower" | "eclipse" | "conjunction" | "mission" | "other"
  description: string
  location?: string
  url?: string
}

export default function SpaceEventsCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState<SpaceEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<SpaceEvent | null>(null)
  const [filteredTypes, setFilteredTypes] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Event types for filtering
  const eventTypes = [
    { value: "meteor-shower", label: "Meteor Shower", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { value: "eclipse", label: "Eclipse", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    { value: "conjunction", label: "Conjunction", color: "bg-green-500/20 text-green-400 border-green-500/30" },
    { value: "mission", label: "Space Mission", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    { value: "other", label: "Other", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  ]

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchEvents = () => {
      // Sample space events data
      const sampleEvents: SpaceEvent[] = [
        {
          id: "e1",
          title: "Perseid Meteor Shower Peak",
          date: "2025-08-12",
          type: "meteor-shower",
          description:
            "One of the best meteor showers of the year, with up to 100 meteors per hour at its peak. The shower runs annually from July 17 to August 24.",
          url: "https://earthsky.org/astronomy-essentials/everything-you-need-to-know-perseid-meteor-shower/",
        },
        {
          id: "e2",
          title: "Total Solar Eclipse",
          date: "2025-03-29",
          type: "eclipse",
          description:
            "A total solar eclipse will be visible from parts of North America, Europe, and North Africa. The path of totality will cross from Mexico through the United States and into Canada.",
          location: "North America, Europe, North Africa",
          url: "https://www.timeanddate.com/eclipse/solar/2025-march-29",
        },
        {
          id: "e3",
          title: "Mars Sample Return Mission Launch Window",
          date: "2025-07-01",
          type: "mission",
          description:
            "The launch window opens for NASA's Mars Sample Return mission, which aims to bring samples collected by the Perseverance rover back to Earth for detailed study.",
          url: "https://mars.nasa.gov/mars-exploration/missions/mars-sample-return/",
        },
        {
          id: "e4",
          title: "Jupiter and Venus Conjunction",
          date: "2025-02-11",
          type: "conjunction",
          description:
            "Jupiter and Venus will appear extremely close together in the night sky, separated by just 0.5 degrees. This will be visible to the naked eye shortly after sunset.",
          url: "https://earthsky.org/",
        },
        {
          id: "e5",
          title: "Geminid Meteor Shower Peak",
          date: "2025-12-14",
          type: "meteor-shower",
          description:
            "The Geminid meteor shower is one of the most reliable annual meteor showers, producing up to 120 multicolored meteors per hour at its peak.",
          url: "https://earthsky.org/astronomy-essentials/geminid-meteor-shower-all-you-need-to-know/",
        },
        {
          id: "e6",
          title: "Lunar Eclipse",
          date: "2025-09-07",
          type: "eclipse",
          description:
            "A partial lunar eclipse will be visible from parts of Europe, Africa, Asia, and Australia. The Moon will be partially covered by Earth's shadow.",
          location: "Europe, Africa, Asia, Australia",
          url: "https://www.timeanddate.com/eclipse/lunar/2025-september-7",
        },
        {
          id: "e7",
          title: "Europa Clipper Launch",
          date: "2025-10-10",
          type: "mission",
          description:
            "NASA's Europa Clipper mission is scheduled to launch. The spacecraft will perform multiple flybys of Jupiter's moon Europa to investigate its potential habitability.",
          url: "https://europa.nasa.gov/",
        },
        {
          id: "e8",
          title: "Saturn at Opposition",
          date: "2025-08-02",
          type: "other",
          description:
            "Saturn will be at its closest approach to Earth and fully illuminated by the Sun. This is the best time to view and photograph Saturn and its moons.",
          url: "https://earthsky.org/",
        },
      ]

      setEvents(sampleEvents)
    }

    fetchEvents()
  }, [])

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    setSelectedDate(null)
    setSelectedEvent(null)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    setSelectedDate(null)
    setSelectedEvent(null)
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
    setSelectedDate(new Date())

    // Find events for today
    const today = new Date()
    const todayStr = today.toISOString().split("T")[0]
    const todayEvents = events.filter((event) => event.date === todayStr)

    if (todayEvents.length > 0) {
      setSelectedEvent(todayEvents[0])
    } else {
      setSelectedEvent(null)
    }
  }

  // Filter events by type
  const toggleFilter = (type: string) => {
    if (filteredTypes.includes(type)) {
      setFilteredTypes(filteredTypes.filter((t) => t !== type))
    } else {
      setFilteredTypes([...filteredTypes, type])
    }
  }

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: 0, events: [] })
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateStr = date.toISOString().split("T")[0]

      // Find events for this day
      const dayEvents = events.filter((event) => {
        // If filters are active, only show events of selected types
        if (filteredTypes.length > 0 && !filteredTypes.includes(event.type)) {
          return false
        }

        return event.date === dateStr
      })

      days.push({ day, events: dayEvents, date })
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthName = currentMonth.toLocaleString("default", { month: "long" })

  // Handle day selection
  const selectDate = (day: { day: number; events: SpaceEvent[]; date?: Date }) => {
    if (day.day === 0 || !day.date) return

    setSelectedDate(day.date)

    if (day.events.length > 0) {
      setSelectedEvent(day.events[0])
    } else {
      setSelectedEvent(null)
    }
  }

  // Get badge color for event type
  const getEventBadgeColor = (type: string) => {
    const eventType = eventTypes.find((t) => t.value === type)
    return eventType ? eventType.color : "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  return (
    <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-purple-400" />
          <h2 className="text-xl font-bold">Space Events Calendar</h2>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevMonth}
            className="border-purple-500/30 hover:bg-purple-500/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="min-w-[120px] text-center font-medium">
            {monthName} {currentMonth.getFullYear()}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            className="border-purple-500/30 hover:bg-purple-500/20"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="border-purple-500/30 hover:bg-purple-500/20"
          >
            Today
          </Button>

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

      {showFilters && (
        <div className="mb-4 p-3 bg-black/60 rounded-lg border border-purple-500/10">
          <div className="text-sm font-medium mb-2">Filter by event type:</div>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <Badge
                key={type.value}
                className={`cursor-pointer ${
                  filteredTypes.includes(type.value) ? type.color : "bg-gray-800/50 text-gray-400 border-gray-700"
                }`}
                onClick={() => toggleFilter(type.value)}
              >
                {type.label}
              </Badge>
            ))}

            {filteredTypes.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => setFilteredTypes([])}
                className="text-xs text-purple-400 h-auto p-0"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-400 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => selectDate(day)}
            className={`
              min-h-[60px] p-1 rounded-md border text-center
              ${day.day === 0 ? "border-transparent" : "cursor-pointer"}
              ${
                selectedDate && day.date && selectedDate.toDateString() === day.date.toDateString()
                  ? "bg-purple-500/30 border-purple-500"
                  : day.events.length > 0
                    ? "bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20"
                    : "border-gray-800 hover:bg-gray-800/50"
              }
            `}
          >
            {day.day !== 0 && (
              <>
                <div
                  className={`text-sm ${
                    new Date().toDateString() ===
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.day).toDateString()
                      ? "bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto"
                      : ""
                  }`}
                >
                  {day.day}
                </div>

                {day.events.length > 0 && (
                  <div className="mt-1 flex flex-wrap justify-center gap-1">
                    {day.events.slice(0, 2).map((event, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          event.type === "meteor-shower"
                            ? "bg-blue-400"
                            : event.type === "eclipse"
                              ? "bg-purple-400"
                              : event.type === "conjunction"
                                ? "bg-green-400"
                                : event.type === "mission"
                                  ? "bg-orange-400"
                                  : "bg-gray-400"
                        }`}
                      />
                    ))}

                    {day.events.length > 2 && <div className="text-xs text-gray-400">+{day.events.length - 2}</div>}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {selectedDate && (
        <ScrollReveal direction="up" className="mt-4">
          <div className="border-t border-purple-500/20 pt-4">
            <h3 className="text-lg font-medium mb-2">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h3>

            {selectedEvent ? (
              <div className="bg-black/60 rounded-lg border border-purple-500/20 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold">{selectedEvent.title}</h4>
                  <Badge className={getEventBadgeColor(selectedEvent.type)}>
                    {eventTypes.find((t) => t.value === selectedEvent.type)?.label || selectedEvent.type}
                  </Badge>
                </div>

                <p className="text-gray-300 text-sm mb-3">{selectedEvent.description}</p>

                {selectedEvent.location && (
                  <p className="text-sm text-gray-400 mb-3">
                    <span className="font-medium">Location:</span> {selectedEvent.location}
                  </p>
                )}

                {selectedEvent.url && (
                  <a
                    href={selectedEvent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300"
                  >
                    Learn more
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                )}
              </div>
            ) : (
              <p className="text-gray-400">No space events scheduled for this date.</p>
            )}
          </div>
        </ScrollReveal>
      )}
    </div>
  )
}
