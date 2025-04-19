"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, ZoomIn, ZoomOut, RotateCcw, Play, Pause } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DiagramProps {
  type: "solar-system" | "black-hole" | "galaxy-formation" | "planetary-orbit"
  title: string
  description?: string
}

export default function InteractiveDiagram({ type, title, description }: DiagramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [infoVisible, setInfoVisible] = useState(false)
  const animationRef = useRef<number>()
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Animation variables
    let lastTime = 0
    const fps = 60
    const interval = 1000 / fps
    let delta = 0

    // Animation loop
    const animate = (timestamp: number) => {
      if (!isPlaying) return

      // Calculate delta time
      if (!lastTime) lastTime = timestamp
      delta = timestamp - lastTime

      if (delta > interval) {
        // Update time reference
        timeRef.current += delta / 1000
        lastTime = timestamp - (delta % interval)

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw the selected diagram
        switch (type) {
          case "solar-system":
            drawSolarSystem(ctx, canvas.width, canvas.height, timeRef.current, zoom)
            break
          case "black-hole":
            drawBlackHole(ctx, canvas.width, canvas.height, timeRef.current, zoom)
            break
          case "galaxy-formation":
            drawGalaxyFormation(ctx, canvas.width, canvas.height, timeRef.current, zoom)
            break
          case "planetary-orbit":
            drawPlanetaryOrbit(ctx, canvas.width, canvas.height, timeRef.current, zoom)
            break
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [type, isPlaying, zoom])

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Reset view
  const resetView = () => {
    setZoom(1)
    timeRef.current = 0
  }

  // Zoom in/out
  const zoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 3))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.5))
  }

  return (
    <div className="bg-black/40 rounded-lg border border-purple-500/20 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
        <div className="flex items-center">
          <h3 className="text-lg font-bold">{title}</h3>
          <Badge variant="purple" className="ml-2">
            Interactive
          </Badge>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setInfoVisible(!infoVisible)}
                className={infoVisible ? "text-purple-400" : "text-gray-400"}
              >
                <Info className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View information about this diagram</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {infoVisible && description && (
        <div className="p-4 bg-purple-500/10 border-b border-purple-500/20">
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      )}

      <div className="relative h-[400px]">
        <canvas ref={canvasRef} className="w-full h-full" />

        <div className="absolute bottom-4 left-4 flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlay}
            className="bg-black/60 border-purple-500/30 hover:bg-purple-500/20"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={resetView}
            className="bg-black/60 border-purple-500/30 hover:bg-purple-500/20"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={zoomOut}
            className="bg-black/60 border-purple-500/30 hover:bg-purple-500/20"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={zoomIn}
            className="bg-black/60 border-purple-500/30 hover:bg-purple-500/20"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Drawing functions for different diagram types

// Update the drawSolarSystem function to be more realistic
function drawSolarSystem(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, zoom: number) {
  const centerX = width / 2
  const centerY = height / 2
  const scale = (Math.min(width, height) / 2) * 0.8 * zoom

  // Draw Sun
  const sunRadius = 20 * zoom
  ctx.beginPath()
  ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2)
  const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sunRadius)
  sunGradient.addColorStop(0, "#fff7d6")
  sunGradient.addColorStop(0.5, "#ffd500")
  sunGradient.addColorStop(0.8, "#ffa726")
  sunGradient.addColorStop(1, "#ff7043")
  ctx.fillStyle = sunGradient
  ctx.fill()

  // Draw sun glow
  ctx.beginPath()
  ctx.arc(centerX, centerY, sunRadius * 1.5, 0, Math.PI * 2)
  const glowGradient = ctx.createRadialGradient(centerX, centerY, sunRadius, centerX, centerY, sunRadius * 2)
  glowGradient.addColorStop(0, "rgba(255, 160, 0, 0.3)")
  glowGradient.addColorStop(1, "rgba(255, 160, 0, 0)")
  ctx.fillStyle = glowGradient
  ctx.fill()

  // Planets data: [distance, size, color, speed, name, tilt, hasRings]
  // Using more realistic relative sizes and distances (still not to true scale as that would make planets too small to see)
  const planets = [
    [0.4, 0.38, "#c0c0c0", 4.15, "Mercury", 0.01, false],
    [0.7, 0.95, "#e6c35c", 1.62, "Venus", 177.4, false],
    [1, 1, "#2e77bd", 1, "Earth", 23.4, false],
    [1.5, 0.53, "#c1440e", 0.53, "Mars", 25.2, false],
    [5.2, 11.2, "#e0ae6f", 0.084, "Jupiter", 3.1, false],
    [9.5, 9.4, "#e0c16f", 0.034, "Saturn", 26.7, true],
    [19.2, 4.0, "#5580aa", 0.012, "Uranus", 97.8, true],
    [30.1, 3.9, "#366896", 0.006, "Neptune", 28.3, false],
  ]

  // Draw planets
  planets.forEach(([distance, size, color, speed, name, tilt, hasRings]) => {
    const scaledDistance = (distance as number) * scale * 0.15
    const angle = time * (speed as number) * 0.2
    const x = centerX + scaledDistance * Math.cos(angle)
    const y = centerY + scaledDistance * Math.sin(angle)
    const planetSize = (size as number) * zoom * 0.8

    // Draw orbit
    ctx.beginPath()
    ctx.arc(centerX, centerY, scaledDistance, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.stroke()

    // Draw planet
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(((tilt as number) * Math.PI) / 180)

    // Create planet gradient for more realistic appearance
    const planetGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, planetSize)
    planetGradient.addColorStop(0, color as string)
    planetGradient.addColorStop(0.8, adjustColor(color as string, -20))
    planetGradient.addColorStop(1, adjustColor(color as string, -40))

    ctx.beginPath()
    ctx.arc(0, 0, planetSize, 0, Math.PI * 2)
    ctx.fillStyle = planetGradient
    ctx.fill()

    // Draw rings for Saturn and Uranus
    if (hasRings) {
      const ringWidth = planetSize * 2.5
      const ringHeight = planetSize * 0.3

      // Outer ring
      ctx.beginPath()
      ctx.ellipse(0, 0, ringWidth, ringHeight, 0, 0, Math.PI * 2)
      ctx.strokeStyle = name === "Saturn" ? "#d1b06b" : "#a7c6e0"
      ctx.lineWidth = planetSize * 0.4
      ctx.stroke()

      // Inner ring - slightly different color
      ctx.beginPath()
      ctx.ellipse(0, 0, ringWidth * 0.7, ringHeight * 0.7, 0, 0, Math.PI * 2)
      ctx.strokeStyle = name === "Saturn" ? "#e0c16f" : "#5580aa"
      ctx.lineWidth = planetSize * 0.2
      ctx.stroke()
    }

    ctx.restore()

    // Draw planet name if zoomed in enough
    if (zoom > 0.8) {
      ctx.font = `${12 * zoom}px Inter, sans-serif`
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.fillText(name as string, x, y + planetSize + 15 * zoom)
    }
  })
}

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  // Convert hex to RGB
  let r = Number.parseInt(color.substring(1, 3), 16)
  let g = Number.parseInt(color.substring(3, 5), 16)
  let b = Number.parseInt(color.substring(5, 7), 16)

  // Adjust brightness
  r = Math.max(0, Math.min(255, r + amount))
  g = Math.max(0, Math.min(255, g + amount))
  b = Math.max(0, Math.min(255, b + amount))

  // Convert back to hex
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

// Update the drawBlackHole function to be more scientifically accurate
function drawBlackHole(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, zoom: number) {
  const centerX = width / 2
  const centerY = height / 2
  const scale = (Math.min(width, height) / 2) * 0.8 * zoom

  // Background stars
  drawStarfield(ctx, width, height, time, 200)

  // Draw accretion disk with more realistic physics
  const diskRadius = scale * 0.6
  const diskInnerRadius = scale * 0.2
  const diskThickness = scale * 0.1

  // Create a more realistic accretion disk with blue-shifted and red-shifted regions
  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.rotate(time * 0.1)

  // Draw the disk with a gradient that shows relativistic effects
  const diskSegments = 180
  const angleStep = (Math.PI * 2) / diskSegments

  for (let i = 0; i < diskSegments; i++) {
    const angle = i * angleStep
    const nextAngle = (i + 1) * angleStep

    // Create a gradient that simulates relativistic beaming
    // The approaching side appears brighter and bluer, the receding side redder
    const gradient = ctx.createRadialGradient(0, 0, diskInnerRadius, 0, 0, diskRadius)

    // Determine if this is the approaching (blue-shifted) or receding (red-shifted) side
    const isApproaching = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2

    if (isApproaching) {
      // Blue-shifted side (brighter, more blue/white)
      gradient.addColorStop(0, "rgba(200, 220, 255, 0.9)")
      gradient.addColorStop(0.3, "rgba(150, 180, 255, 0.8)")
      gradient.addColorStop(0.7, "rgba(100, 150, 255, 0.6)")
      gradient.addColorStop(1, "rgba(70, 100, 200, 0.2)")
    } else {
      // Red-shifted side (dimmer, more red/orange)
      gradient.addColorStop(0, "rgba(255, 150, 100, 0.7)")
      gradient.addColorStop(0.3, "rgba(255, 100, 50, 0.6)")
      gradient.addColorStop(0.7, "rgba(200, 50, 30, 0.4)")
      gradient.addColorStop(1, "rgba(150, 30, 20, 0.1)")
    }

    // Draw disk segment
    ctx.beginPath()
    ctx.moveTo(diskInnerRadius * Math.cos(angle), diskInnerRadius * Math.sin(angle) * 0.3)
    ctx.lineTo(diskRadius * Math.cos(angle), diskRadius * Math.sin(angle) * 0.3)
    ctx.lineTo(diskRadius * Math.cos(nextAngle), diskRadius * Math.sin(nextAngle) * 0.3)
    ctx.lineTo(diskInnerRadius * Math.cos(nextAngle), diskInnerRadius * Math.sin(nextAngle) * 0.3)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()
  }

  // Add some hot spots in the disk that rotate at different speeds
  for (let i = 0; i < 8; i++) {
    const distance = diskInnerRadius + Math.random() * (diskRadius - diskInnerRadius)
    const angle = (i / 8) * Math.PI * 2 + time * (0.2 + Math.random() * 0.3)
    const x = distance * Math.cos(angle)
    const y = distance * Math.sin(angle) * 0.3
    const spotSize = scale * 0.01 * (1 + Math.random() * 2)
    const brightness = 0.7 + Math.random() * 0.3

    ctx.beginPath()
    ctx.arc(x, y, spotSize, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, ${Math.floor(200 + Math.random() * 55)}, ${brightness})`
    ctx.fill()
  }

  ctx.restore()

  // Draw black hole (event horizon)
  const blackHoleRadius = scale * 0.15

  // Draw photon sphere (1.5 times the event horizon radius)
  const photonSphereRadius = blackHoleRadius * 1.5
  ctx.beginPath()
  ctx.arc(centerX, centerY, photonSphereRadius, 0, Math.PI * 2)
  ctx.strokeStyle = "rgba(100, 100, 255, 0.3)"
  ctx.lineWidth = 1
  ctx.stroke()

  // Draw event horizon
  ctx.beginPath()
  ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2)
  ctx.fillStyle = "black"
  ctx.fill()

  // Add a subtle boundary to the event horizon
  ctx.beginPath()
  ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2)
  ctx.strokeStyle = "rgba(50, 50, 50, 0.5)"
  ctx.lineWidth = 1
  ctx.stroke()

  // Draw gravitational lensing effect
  const lensRadius = blackHoleRadius * 3
  const lensGradient = ctx.createRadialGradient(centerX, centerY, blackHoleRadius, centerX, centerY, lensRadius)
  lensGradient.addColorStop(0, "rgba(0, 0, 0, 0.9)")
  lensGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.5)")
  lensGradient.addColorStop(0.8, "rgba(0, 0, 0, 0.2)")
  lensGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

  ctx.beginPath()
  ctx.arc(centerX, centerY, lensRadius, 0, Math.PI * 2)
  ctx.fillStyle = lensGradient
  ctx.fill()

  // Draw gravitational lensing of background stars
  drawLensedStars(ctx, centerX, centerY, blackHoleRadius, lensRadius, time)

  // Draw event horizon label if zoomed in enough
  if (zoom > 0.8) {
    // Event Horizon label
    ctx.font = `${14 * zoom}px Inter, sans-serif`
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "center"
    ctx.fillText("Event Horizon", centerX, centerY + blackHoleRadius * 2)

    // Photon Sphere label
    ctx.font = `${12 * zoom}px Inter, sans-serif`
    ctx.fillStyle = "rgba(150, 150, 255, 0.8)"
    ctx.textAlign = "center"
    ctx.fillText("Photon Sphere", centerX, centerY - photonSphereRadius - 10)

    // Accretion Disk label
    ctx.font = `${12 * zoom}px Inter, sans-serif`
    ctx.fillStyle = "rgba(255, 200, 150, 0.8)"
    ctx.textAlign = "center"
    ctx.fillText("Accretion Disk", centerX + diskRadius * 0.7, centerY + diskThickness * 2)
  }
}

// Helper function to draw a realistic starfield
function drawStarfield(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, starCount: number) {
  // Clear canvas with a very dark blue background
  ctx.fillStyle = "rgb(0, 0, 10)"
  ctx.fillRect(0, 0, width, height)

  // Draw stars with different sizes and brightness
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const size = Math.random() * 1.5 + 0.5
    const brightness = 0.5 + Math.random() * 0.5

    // Twinkle effect
    const twinkle = Math.sin(time * 3 + i * 100) * 0.2 + 0.8

    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)

    // Vary star colors slightly
    const r = Math.floor(220 + Math.random() * 35)
    const g = Math.floor(220 + Math.random() * 35)
    const b = Math.floor(220 + Math.random() * 35)

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${brightness * twinkle})`
    ctx.fill()
  }
}

// Helper function to draw stars affected by gravitational lensing
function drawLensedStars(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  blackHoleRadius: number,
  lensRadius: number,
  time: number,
) {
  // Draw stars that appear to warp around the black hole
  for (let i = 0; i < 150; i++) {
    const angle = Math.random() * Math.PI * 2
    const distance = blackHoleRadius + Math.random() * lensRadius * 3

    // Calculate warping effect based on distance from black hole
    let warpFactor = 1
    if (distance < lensRadius * 2) {
      // Stronger warping closer to the black hole
      warpFactor = 1 + ((lensRadius * 2 - distance) / (lensRadius * 2)) * 2
    }

    // Create curved paths for stars near the black hole
    const baseAngle = angle + time * 0.05
    const warpedAngle = baseAngle + (blackHoleRadius / distance) * 2

    // Stars closer to the black hole appear to move in curved paths
    const x = centerX + (distance * Math.cos(warpedAngle)) / warpFactor
    const y = centerY + (distance * Math.sin(warpedAngle)) / warpFactor

    // Stars closer to the black hole appear stretched
    const stretchFactor = distance < lensRadius * 1.5 ? ((lensRadius * 1.5 - distance) / lensRadius) * 3 + 1 : 1

    const starSize = Math.random() * 1.5 + 0.5

    // Draw stretched star
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(warpedAngle + Math.PI / 2)
    ctx.beginPath()
    ctx.ellipse(0, 0, starSize, starSize * stretchFactor, 0, 0, Math.PI * 2)

    // Stars closer to black hole appear brighter due to lensing
    const brightness =
      distance < lensRadius * 1.2 ? 0.8 + ((lensRadius * 1.2 - distance) / (lensRadius * 1.2)) * 0.2 : 0.8

    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
    ctx.fill()
    ctx.restore()
  }
}

function drawGalaxyFormation(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, zoom: number) {
  const centerX = width / 2
  const centerY = height / 2
  const scale = (Math.min(width, height) / 2) * 0.8 * zoom

  // Draw galaxy core
  const coreRadius = scale * 0.2
  const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius)
  coreGradient.addColorStop(0, "rgba(255, 255, 200, 0.8)")
  coreGradient.addColorStop(0.7, "rgba(255, 200, 100, 0.5)")
  coreGradient.addColorStop(1, "rgba(255, 150, 50, 0.2)")

  ctx.beginPath()
  ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2)
  ctx.fillStyle = coreGradient
  ctx.fill()

  // Draw spiral arms
  const armCount = 2
  const rotationSpeed = time * 0.05

  for (let arm = 0; arm < armCount; arm++) {
    const baseAngle = (arm / armCount) * Math.PI * 2 + rotationSpeed

    // Draw each arm as a series of particles
    for (let i = 0; i < 500; i++) {
      const distance = coreRadius + (i / 500) * scale * 0.7
      const angle = baseAngle + (distance - coreRadius) * 0.5

      const x = centerX + distance * Math.cos(angle)
      const y = centerY + distance * Math.sin(angle)

      // Add some randomness to the arm position
      const randomOffset = Math.sin(i * 0.1 + time) * 0.1 * distance
      const finalX = x + randomOffset * Math.cos(angle + Math.PI / 2)
      const finalY = y + randomOffset * Math.sin(angle + Math.PI / 2)

      // Particle size and opacity based on position
      const particleSize = Math.random() * 2 * zoom * (1 - (distance - coreRadius) / (scale * 0.7))
      const opacity = 0.8 * (1 - (distance - coreRadius) / (scale * 0.7))

      // Determine color based on position in arm
      let color
      if (Math.random() > 0.7) {
        // Bright star
        color = `rgba(255, 255, 255, ${opacity})`
      } else if (Math.random() > 0.5) {
        // Yellowish star
        color = `rgba(255, 240, 180, ${opacity})`
      } else {
        // Bluish star
        color = `rgba(180, 220, 255, ${opacity})`
      }

      ctx.beginPath()
      ctx.arc(finalX, finalY, particleSize, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
    }
  }

  // Draw some dust lanes
  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.rotate(rotationSpeed * 0.7)

  for (let i = 0; i < armCount; i++) {
    const angle = (i / armCount) * Math.PI * 2

    ctx.beginPath()
    ctx.moveTo(coreRadius * Math.cos(angle), coreRadius * Math.sin(angle))

    for (let d = coreRadius; d < scale * 0.7; d += 5) {
      const curveAngle = angle + (d - coreRadius) * 0.4
      ctx.lineTo(d * Math.cos(curveAngle), d * Math.sin(curveAngle))
    }

    ctx.strokeStyle = "rgba(50, 10, 10, 0.2)"
    ctx.lineWidth = scale * 0.05
    ctx.stroke()
  }

  ctx.restore()

  // Draw labels if zoomed in enough
  if (zoom > 0.8) {
    ctx.font = `${14 * zoom}px Inter, sans-serif`
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "center"
    ctx.fillText("Galactic Core", centerX, centerY - coreRadius - 10 * zoom)

    // Label one of the spiral arms
    const armLabelAngle = rotationSpeed + Math.PI / 4
    const armLabelDistance = scale * 0.4
    const armLabelX = centerX + armLabelDistance * Math.cos(armLabelAngle)
    const armLabelY = centerY + armLabelDistance * Math.sin(armLabelAngle)

    ctx.fillText("Spiral Arm", armLabelX, armLabelY)
  }
}

function drawPlanetaryOrbit(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, zoom: number) {
  const centerX = width / 2
  const centerY = height / 2
  const scale = (Math.min(width, height) / 2) * 0.8 * zoom

  // Draw star
  const starRadius = scale * 0.15
  const starGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, starRadius)
  starGradient.addColorStop(0, "#fff7d6")
  starGradient.addColorStop(0.8, "#ffa726")
  starGradient.addColorStop(1, "#ff7043")

  ctx.beginPath()
  ctx.arc(centerX, centerY, starRadius, 0, Math.PI * 2)
  ctx.fillStyle = starGradient
  ctx.fill()

  // Draw star glow
  const glowRadius = starRadius * 1.5
  const glowGradient = ctx.createRadialGradient(centerX, centerY, starRadius, centerX, centerY, glowRadius)
  glowGradient.addColorStop(0, "rgba(255, 160, 0, 0.3)")
  glowGradient.addColorStop(1, "rgba(255, 160, 0, 0)")

  ctx.beginPath()
  ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2)
  ctx.fillStyle = glowGradient
  ctx.fill()

  // Draw orbital paths
  const orbits = [
    { distance: scale * 0.3, eccentricity: 0.1, color: "rgba(255, 255, 255, 0.2)" },
    { distance: scale * 0.5, eccentricity: 0.2, color: "rgba(255, 255, 255, 0.15)" },
    { distance: scale * 0.7, eccentricity: 0.05, color: "rgba(255, 255, 255, 0.1)" },
  ]

  orbits.forEach((orbit) => {
    const { distance, eccentricity, color } = orbit

    // Draw elliptical orbit
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, distance, distance * (1 - eccentricity), 0, 0, Math.PI * 2)
    ctx.strokeStyle = color
    ctx.stroke()
  })

  // Draw planets
  const planets = [
    {
      distance: scale * 0.3,
      eccentricity: 0.1,
      size: scale * 0.03,
      color: "#c0c0c0",
      speed: 0.5,
      name: "Alpha",
    },
    {
      distance: scale * 0.5,
      eccentricity: 0.2,
      size: scale * 0.05,
      color: "#2e77bd",
      speed: 0.3,
      name: "Beta",
    },
    {
      distance: scale * 0.7,
      eccentricity: 0.05,
      size: scale * 0.04,
      color: "#c1440e",
      speed: 0.15,
      name: "Gamma",
    },
  ]

  planets.forEach((planet) => {
    const { distance, eccentricity, size, color, speed, name } = planet

    // Calculate position based on elliptical orbit
    const angle = time * speed
    const x = centerX + distance * Math.cos(angle)
    const y = centerY + distance * (1 - eccentricity) * Math.sin(angle)

    // Draw planet
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    // Draw planet name if zoomed in enough
    if (zoom > 0.8) {
      ctx.font = `${12 * zoom}px Inter, sans-serif`
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.fillText(name, x, y + size + 15 * zoom)
    }

    // Draw orbit line from planet to star (gravitational pull visualization)
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(x, y)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
    ctx.stroke()
  })

  // Draw labels if zoomed in enough
  if (zoom > 0.8) {
    ctx.font = `${14 * zoom}px Inter, sans-serif`
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "center"
    ctx.fillText("Star", centerX, centerY - starRadius - 10 * zoom)

    // Draw orbital mechanics info
    ctx.font = `${12 * zoom}px Inter, sans-serif`
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.textAlign = "left"
    ctx.fillText("Orbital Mechanics:", 20, 30)
    ctx.fillText("• Planets follow elliptical orbits", 25, 50)
    ctx.fillText("• Orbital speed varies with distance", 25, 70)
  }
}
