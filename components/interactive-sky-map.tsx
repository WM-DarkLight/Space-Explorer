"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ZoomIn, ZoomOut, RotateCcw, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Star {
  id: string
  name: string
  x: number
  y: number
  magnitude: number
  color: string
  constellation?: string
  description?: string
}

interface Constellation {
  id: string
  name: string
  lines: [number, number][]
  stars: string[]
}

export default function InteractiveSkyMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStar, setSelectedStar] = useState<Star | null>(null)
  const [showConstellations, setShowConstellations] = useState(true)
  const [stars, setStars] = useState<Star[]>([])
  const [constellations, setConstellations] = useState<Constellation[]>([])

  // Initialize sample data
  useEffect(() => {
    // Sample stars data
    const sampleStars: Star[] = [
      {
        id: "sirius",
        name: "Sirius",
        x: 100,
        y: 150,
        magnitude: 1.46,
        color: "#a3c4ff",
        constellation: "canis-major",
        description: "Sirius is the brightest star in the night sky. Its name comes from the Greek word for 'glowing'.",
      },
      {
        id: "betelgeuse",
        name: "Betelgeuse",
        x: 250,
        y: 100,
        magnitude: 0.42,
        color: "#ff9d7a",
        constellation: "orion",
        description:
          "Betelgeuse is a red supergiant star in the constellation Orion. It's one of the largest stars visible to the naked eye.",
      },
      {
        id: "rigel",
        name: "Rigel",
        x: 300,
        y: 200,
        magnitude: 0.13,
        color: "#b8c4ff",
        constellation: "orion",
        description:
          "Rigel is a blue supergiant star in the constellation Orion. It's the seventh brightest star in the night sky.",
      },
      {
        id: "polaris",
        name: "Polaris",
        x: 150,
        y: 50,
        magnitude: 1.97,
        color: "#fff4d6",
        constellation: "ursa-minor",
        description:
          "Polaris is the North Star. It's located nearly at the north celestial pole, making it an important navigation star.",
      },
      {
        id: "vega",
        name: "Vega",
        x: 400,
        y: 120,
        magnitude: 0.03,
        color: "#d8e9ff",
        constellation: "lyra",
        description:
          "Vega is the fifth brightest star in the night sky and the second brightest star in the northern hemisphere.",
      },
      {
        id: "antares",
        name: "Antares",
        x: 350,
        y: 300,
        magnitude: 1.09,
        color: "#ff6b4a",
        constellation: "scorpius",
        description:
          "Antares is a red supergiant star in the constellation Scorpius. Its name means 'rival of Mars' due to its reddish appearance.",
      },
      {
        id: "aldebaran",
        name: "Aldebaran",
        x: 200,
        y: 250,
        magnitude: 0.87,
        color: "#ffaa77",
        constellation: "taurus",
        description:
          "Aldebaran is an orange giant star in the constellation Taurus. It appears to be the eye of the bull in the constellation.",
      },
      {
        id: "altair",
        name: "Altair",
        x: 450,
        y: 200,
        magnitude: 0.77,
        color: "#f8f7ff",
        constellation: "aquila",
        description:
          "Altair is the brightest star in the constellation Aquila and the twelfth brightest star in the night sky.",
      },
      {
        id: "deneb",
        name: "Deneb",
        x: 500,
        y: 150,
        magnitude: 1.25,
        color: "#f0f8ff",
        constellation: "cygnus",
        description:
          "Deneb is the brightest star in the constellation Cygnus. It's one of the most luminous stars known.",
      },
      {
        id: "spica",
        name: "Spica",
        x: 280,
        y: 350,
        magnitude: 1.04,
        color: "#b9d9ff",
        constellation: "virgo",
        description:
          "Spica is the brightest star in the constellation Virgo and the 16th brightest star in the night sky.",
      },
    ]

    // Sample constellations data
    const sampleConstellations: Constellation[] = [
      {
        id: "orion",
        name: "Orion",
        stars: ["betelgeuse", "rigel"],
        lines: [[1, 2]],
      },
      {
        id: "ursa-minor",
        name: "Ursa Minor",
        stars: ["polaris"],
        lines: [],
      },
      {
        id: "canis-major",
        name: "Canis Major",
        stars: ["sirius"],
        lines: [],
      },
      {
        id: "lyra",
        name: "Lyra",
        stars: ["vega"],
        lines: [],
      },
      {
        id: "scorpius",
        name: "Scorpius",
        stars: ["antares"],
        lines: [],
      },
      {
        id: "taurus",
        name: "Taurus",
        stars: ["aldebaran"],
        lines: [],
      },
      {
        id: "aquila",
        name: "Aquila",
        stars: ["altair"],
        lines: [],
      },
      {
        id: "cygnus",
        name: "Cygnus",
        stars: ["deneb"],
        lines: [],
      },
      {
        id: "virgo",
        name: "Virgo",
        stars: ["spica"],
        lines: [],
      },
    ]

    setStars(sampleStars)
    setConstellations(sampleConstellations)
  }, [])

  // Draw the sky map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth
        canvas.height = containerRef.current.clientHeight
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Clear canvas
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw stars
    stars.forEach((star) => {
      const x = star.x * zoom + offset.x
      const y = star.y * zoom + offset.y
      const radius = Math.max(1, (5 - star.magnitude) * zoom * 0.8)

      // Draw star
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = star.color || "#ffffff"
      ctx.fill()

      // Draw glow effect
      const gradient = ctx.createRadialGradient(x, y, radius, x, y, radius * 3)
      gradient.addColorStop(0, `${star.color}80`) // Semi-transparent
      gradient.addColorStop(1, "transparent")
      ctx.beginPath()
      ctx.arc(x, y, radius * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw name if zoomed in enough or if it's the selected star
      if (zoom > 1.5 || (selectedStar && selectedStar.id === star.id)) {
        ctx.font = `${12 * zoom}px Inter, sans-serif`
        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.fillText(star.name, x, y + radius + 15 * zoom)
      }
    })

    // Draw constellation lines if enabled
    if (showConstellations) {
      ctx.strokeStyle = "rgba(138, 43, 226, 0.3)"
      ctx.lineWidth = 1 * zoom

      constellations.forEach((constellation) => {
        constellation.lines.forEach(([startIdx, endIdx]) => {
          const startStar = stars.find((s) => s.id === constellation.stars[startIdx])
          const endStar = stars.find((s) => s.id === constellation.stars[endIdx])

          if (startStar && endStar) {
            ctx.beginPath()
            ctx.moveTo(startStar.x * zoom + offset.x, startStar.y * zoom + offset.y)
            ctx.lineTo(endStar.x * zoom + offset.x, endStar.y * zoom + offset.y)
            ctx.stroke()
          }
        })
      })
    }

    // Highlight selected star
    if (selectedStar) {
      const x = selectedStar.x * zoom + offset.x
      const y = selectedStar.y * zoom + offset.y
      const radius = Math.max(1, (5 - selectedStar.magnitude) * zoom * 0.8)

      ctx.beginPath()
      ctx.arc(x, y, radius * 2, 0, Math.PI * 2)
      ctx.strokeStyle = "#8a2be2"
      ctx.lineWidth = 2 * zoom
      ctx.stroke()
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [stars, constellations, zoom, offset, selectedStar, showConstellations])

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle click to select star
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / zoom - offset.x / zoom
    const y = (e.clientY - rect.top) / zoom - offset.y / zoom

    // Find clicked star
    const clickedStar = stars.find((star) => {
      const distance = Math.sqrt(Math.pow(star.x - x, 2) + Math.pow(star.y - y, 2))
      return distance < 20 / zoom // Increased click area
    })

    setSelectedStar(clickedStar || null)
  }

  // Handle zoom
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.5))
  }

  // Handle reset
  const handleReset = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setSelectedStar(null)
  }

  // Handle search
  const handleSearch = () => {
    if (!searchTerm) return

    const foundStar = stars.find((star) => star.name.toLowerCase().includes(searchTerm.toLowerCase()))

    if (foundStar) {
      setSelectedStar(foundStar)
      setOffset({
        x: -foundStar.x * zoom + (containerRef.current?.clientWidth || 0) / 2,
        y: -foundStar.y * zoom + (containerRef.current?.clientHeight || 0) / 2,
      })
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 p-4 bg-black/40 rounded-lg border border-purple-500/20">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            className="border-purple-500/30 hover:bg-purple-500/20"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            className="border-purple-500/30 hover:bg-purple-500/20"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="border-purple-500/30 hover:bg-purple-500/20"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Input
              type="text"
              placeholder="Search stars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 bg-black/40 border-purple-500/30"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showConstellations}
              onChange={() => setShowConstellations(!showConstellations)}
              className="rounded border-purple-500/30 bg-black/40 text-purple-600 focus:ring-purple-500"
            />
            <span>Show Constellations</span>
          </label>
        </div>
      </div>

      <div
        className="relative flex-1 bg-black rounded-lg border border-purple-500/20 overflow-hidden"
        ref={containerRef}
      >
        <canvas
          ref={canvasRef}
          className="cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
        />

        {selectedStar && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md p-4 bg-black/80 backdrop-blur-sm rounded-lg border border-purple-500/30">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white">{selectedStar.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setSelectedStar(null)}
              >
                <span className="sr-only">Close</span>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {selectedStar.constellation && (
              <Badge variant="purple" className="mb-2">
                {constellations.find((c) => c.id === selectedStar.constellation)?.name || selectedStar.constellation}
              </Badge>
            )}

            <p className="text-gray-300 text-sm mb-2">Magnitude: {selectedStar.magnitude}</p>

            {selectedStar.description && <p className="text-gray-300 text-sm">{selectedStar.description}</p>}
          </div>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 rounded-full bg-black/60 border-purple-500/30"
              >
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p>
                Click and drag to move around the sky map. Use the zoom buttons to zoom in and out. Click on a star to
                view more information about it.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

import { X } from "lucide-react"
