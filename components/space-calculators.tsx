"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ScrollReveal from "@/components/scroll-reveal"

export default function SpaceCalculators() {
  return (
    <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-5 w-5 text-purple-400 mr-2" />
        <h2 className="text-xl font-bold">Space Calculators</h2>
      </div>

      <Tabs defaultValue="orbital" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="orbital">Orbital Mechanics</TabsTrigger>
          <TabsTrigger value="rocket">Rocket Equation</TabsTrigger>
          <TabsTrigger value="distance">Distance Converter</TabsTrigger>
          <TabsTrigger value="gravity">Gravity Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="orbital" className="space-y-4">
          <OrbitalCalculator />
        </TabsContent>

        <TabsContent value="rocket" className="space-y-4">
          <RocketEquationCalculator />
        </TabsContent>

        <TabsContent value="distance" className="space-y-4">
          <DistanceConverter />
        </TabsContent>

        <TabsContent value="gravity" className="space-y-4">
          <GravityCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrbitalCalculator() {
  const [mass, setMass] = useState<string>("5.97e24") // Earth's mass in kg
  const [distance, setDistance] = useState<string>("6371") // Earth's radius in km
  const [velocity, setVelocity] = useState<string>("")
  const [period, setPeriod] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculateOrbitalValues = () => {
    try {
      setError("")
      const G = 6.6743e-11 // Gravitational constant in m^3 kg^-1 s^-2
      const massValue = Number.parseFloat(mass)
      const distanceValue = Number.parseFloat(distance) * 1000 // Convert km to m

      if (isNaN(massValue) || isNaN(distanceValue) || massValue <= 0 || distanceValue <= 0) {
        throw new Error("Please enter valid positive numbers")
      }

      // Calculate orbital velocity
      const orbitalVelocity = Math.sqrt((G * massValue) / distanceValue)
      setVelocity(orbitalVelocity.toFixed(2))

      // Calculate orbital period
      const orbitalPeriod = (2 * Math.PI * distanceValue) / orbitalVelocity
      setPeriod((orbitalPeriod / 60).toFixed(2)) // Convert to minutes
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An error occurred during calculation")
      }
    }
  }

  return (
    <ScrollReveal>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Orbital Velocity & Period Calculator</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Calculate the orbital velocity and period for an object orbiting a central body using Kepler's laws.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Central Body Mass (kg)</label>
            <Input
              type="text"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
              placeholder="e.g., 5.97e24 for Earth"
              className="bg-black/40 border-purple-500/30"
            />
            <p className="text-xs text-gray-400 mt-1">Earth: 5.97e24 kg, Sun: 1.989e30 kg</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Orbital Distance (km)</label>
            <Input
              type="text"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="e.g., 6371 for Earth's surface"
              className="bg-black/40 border-purple-500/30"
            />
            <p className="text-xs text-gray-400 mt-1">Earth radius: 6,371 km, Earth to Moon: 384,400 km</p>
          </div>
        </div>

        <Button onClick={calculateOrbitalValues} className="w-full bg-purple-600 hover:bg-purple-700">
          Calculate
        </Button>

        {error && (
          <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        )}

        {velocity && period && !error && (
          <div className="p-4 rounded-md bg-purple-500/10 border border-purple-500/30">
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-400">Orbital Velocity:</p>
                <p className="text-xl font-bold">{velocity} m/s</p>
                <p className="text-xs text-gray-400">{(Number.parseFloat(velocity) * 3.6).toFixed(2)} km/h</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Orbital Period:</p>
                <p className="text-xl font-bold">{period} minutes</p>
                <p className="text-xs text-gray-400">{(Number.parseFloat(period) / 60).toFixed(2)} hours</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-400">
          <p className="font-medium mb-1">Formula:</p>
          <p>Orbital Velocity (v) = √(G × M / r)</p>
          <p>Orbital Period (T) = 2π × r / v</p>
          <p className="mt-1">Where:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>G = Gravitational constant (6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻²)</li>
            <li>M = Mass of the central body (kg)</li>
            <li>r = Orbital distance (m)</li>
          </ul>
        </div>
      </div>
    </ScrollReveal>
  )
}

function RocketEquationCalculator() {
  const [exhaustVelocity, setExhaustVelocity] = useState<string>("4500") // m/s
  const [massRatio, setMassRatio] = useState<string>("5") // Initial mass / Final mass
  const [deltaV, setDeltaV] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculateDeltaV = () => {
    try {
      setError("")
      const ve = Number.parseFloat(exhaustVelocity)
      const mr = Number.parseFloat(massRatio)

      if (isNaN(ve) || isNaN(mr) || ve <= 0 || mr <= 1) {
        throw new Error(
          "Please enter valid values. Exhaust velocity must be positive and mass ratio must be greater than 1.",
        )
      }

      // Calculate delta-v using the Tsiolkovsky rocket equation
      const dv = ve * Math.log(mr)
      setDeltaV(dv.toFixed(2))
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An error occurred during calculation")
      }
    }
  }

  return (
    <ScrollReveal>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Rocket Equation Calculator</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Calculate the change in velocity (delta-v) using the Tsiolkovsky rocket equation.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Exhaust Velocity (m/s)</label>
            <Input
              type="text"
              value={exhaustVelocity}
              onChange={(e) => setExhaustVelocity(e.target.value)}
              placeholder="e.g., 4500"
              className="bg-black/40 border-purple-500/30"
            />
            <p className="text-xs text-gray-400 mt-1">Typical values: 2,000-5,000 m/s for chemical rockets</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Mass Ratio (Initial/Final)</label>
            <Input
              type="text"
              value={massRatio}
              onChange={(e) => setMassRatio(e.target.value)}
              placeholder="e.g., 5"
              className="bg-black/40 border-purple-500/30"
            />
            <p className="text-xs text-gray-400 mt-1">Must be greater than 1. Typical values: 2-20</p>
          </div>
        </div>

        <Button onClick={calculateDeltaV} className="w-full bg-purple-600 hover:bg-purple-700">
          Calculate Delta-V
        </Button>

        {error && (
          <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        )}

        {deltaV && !error && (
          <div className="p-4 rounded-md bg-purple-500/10 border border-purple-500/30">
            <p className="text-sm text-gray-400">Maximum Change in Velocity (Delta-V):</p>
            <p className="text-xl font-bold">{deltaV} m/s</p>
            <p className="text-xs text-gray-400">{(Number.parseFloat(deltaV) * 3.6).toFixed(2)} km/h</p>

            <div className="mt-3 text-sm">
              <p className="text-gray-400">Reference Delta-V values:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400">
                <li>Earth to Low Earth Orbit: ~9,400 m/s</li>
                <li>Earth to Moon Transfer: ~3,900 m/s</li>
                <li>Earth to Mars Transfer: ~4,300 m/s</li>
              </ul>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-400">
          <p className="font-medium mb-1">Tsiolkovsky Rocket Equation:</p>
          <p>Δv = ve × ln(m₀/m₁)</p>
          <p className="mt-1">Where:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Δv = Change in velocity (m/s)</li>
            <li>ve = Exhaust velocity (m/s)</li>
            <li>m₀ = Initial mass (kg)</li>
            <li>m₁ = Final mass (kg)</li>
            <li>ln = Natural logarithm</li>
          </ul>
        </div>
      </div>
    </ScrollReveal>
  )
}

function DistanceConverter() {
  const [value, setValue] = useState<string>("")
  const [fromUnit, setFromUnit] = useState<string>("km")
  const [toUnit, setToUnit] = useState<string>("ly")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const units = [
    { value: "km", label: "Kilometers (km)" },
    { value: "au", label: "Astronomical Units (AU)" },
    { value: "ly", label: "Light Years (ly)" },
    { value: "pc", label: "Parsecs (pc)" },
  ]

  const conversionFactors: Record<string, number> = {
    km: 1,
    au: 1.496e8, // 1 AU = 149,600,000 km
    ly: 9.461e12, // 1 light year = 9,461,000,000,000 km
    pc: 3.086e13, // 1 parsec = 30,860,000,000,000 km
  }

  const convertDistance = () => {
    try {
      setError("")
      const inputValue = Number.parseFloat(value)

      if (isNaN(inputValue) || inputValue < 0) {
        throw new Error("Please enter a valid positive number")
      }

      // Convert to kilometers first
      const kmValue = inputValue * conversionFactors[fromUnit]

      // Then convert from kilometers to target unit
      const resultValue = kmValue / conversionFactors[toUnit]

      // Format the result based on its magnitude
      let formattedResult
      if (resultValue < 0.001 || resultValue > 1e9) {
        formattedResult = resultValue.toExponential(6)
      } else {
        formattedResult = resultValue.toLocaleString(undefined, {
          maximumFractionDigits: 6,
        })
      }

      setResult(formattedResult)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An error occurred during conversion")
      }
    }
  }

  return (
    <ScrollReveal>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Astronomical Distance Converter</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Convert between different astronomical distance units.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Value</label>
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter distance"
              className="bg-black/40 border-purple-500/30"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full rounded-md border border-purple-500/30 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full rounded-md border border-purple-500/30 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button onClick={convertDistance} className="w-full bg-purple-600 hover:bg-purple-700">
          Convert
        </Button>

        {error && (
          <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        )}

        {result && !error && (
          <div className="p-4 rounded-md bg-purple-500/10 border border-purple-500/30">
            <p className="text-sm text-gray-400">Result:</p>
            <p className="text-xl font-bold">
              {value} {units.find((u) => u.value === fromUnit)?.label.split(" ")[0]} = {result}{" "}
              {units.find((u) => u.value === toUnit)?.label.split(" ")[0]}
            </p>
          </div>
        )}

        <div className="text-sm text-gray-400">
          <p className="font-medium mb-1">Common Astronomical Distances:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Earth to Moon: 384,400 km (0.00257 AU)</li>
            <li>Earth to Sun: 149.6 million km (1 AU)</li>
            <li>Sun to Alpha Centauri: 4.37 light years (1.34 parsecs)</li>
            <li>Milky Way diameter: ~100,000 light years (~30.7 kiloparsecs)</li>
          </ul>
        </div>
      </div>
    </ScrollReveal>
  )
}

function GravityCalculator() {
  const [mass, setMass] = useState<string>("5.97e24") // Earth's mass in kg
  const [radius, setRadius] = useState<string>("6371") // Earth's radius in km
  const [gravity, setGravity] = useState<string>("")
  const [escapeVelocity, setEscapeVelocity] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculateGravity = () => {
    try {
      setError("")
      const G = 6.6743e-11 // Gravitational constant in m^3 kg^-1 s^-2
      const massValue = Number.parseFloat(mass)
      const radiusValue = Number.parseFloat(radius) * 1000 // Convert km to m

      if (isNaN(massValue) || isNaN(radiusValue) || massValue <= 0 || radiusValue <= 0) {
        throw new Error("Please enter valid positive numbers")
      }

      // Calculate surface gravity
      const surfaceGravity = (G * massValue) / (radiusValue * radiusValue)
      setGravity(surfaceGravity.toFixed(4))

      // Calculate escape velocity
      const escVelocity = Math.sqrt((2 * G * massValue) / radiusValue)
      setEscapeVelocity(escVelocity.toFixed(2))
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An error occurred during calculation")
      }
    }
  }

  // Celestial body presets
  const presets = [
    { name: "Earth", mass: "5.97e24", radius: "6371" },
    { name: "Moon", mass: "7.35e22", radius: "1737" },
    { name: "Mars", mass: "6.42e23", radius: "3390" },
    { name: "Jupiter", mass: "1.898e27", radius: "69911" },
  ]

  const applyPreset = (preset: { mass: string; radius: string }) => {
    setMass(preset.mass)
    setRadius(preset.radius)
  }

  return (
    <ScrollReveal>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Surface Gravity & Escape Velocity Calculator</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Calculate the surface gravity and escape velocity for a celestial body.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {presets.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset)}
              className="border-purple-500/30 hover:bg-purple-500/20"
            >
              {preset.name}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Mass (kg)</label>
            <Input
              type="text"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
              placeholder="e.g., 5.97e24 for Earth"
              className="bg-black/40 border-purple-500/30"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Radius (km)</label>
            <Input
              type="text"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              placeholder="e.g., 6371 for Earth"
              className="bg-black/40 border-purple-500/30"
            />
          </div>
        </div>

        <Button onClick={calculateGravity} className="w-full bg-purple-600 hover:bg-purple-700">
          Calculate
        </Button>

        {error && (
          <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        )}

        {gravity && escapeVelocity && !error && (
          <div className="p-4 rounded-md bg-purple-500/10 border border-purple-500/30">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-400">Surface Gravity:</p>
                <p className="text-xl font-bold">{gravity} m/s²</p>
                <p className="text-xs text-gray-400">{(Number.parseFloat(gravity) / 9.8).toFixed(2)} g (Earth = 1)</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Escape Velocity:</p>
                <p className="text-xl font-bold">{escapeVelocity} m/s</p>
                <p className="text-xs text-gray-400">{(Number.parseFloat(escapeVelocity) * 3.6).toFixed(2)} km/h</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-400">
          <p className="font-medium mb-1">Formulas:</p>
          <p>Surface Gravity (g) = G × M / r²</p>
          <p>Escape Velocity (v) = √(2 × G × M / r)</p>
          <p className="mt-1">Where:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>G = Gravitational constant (6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻²)</li>
            <li>M = Mass of the celestial body (kg)</li>
            <li>r = Radius of the celestial body (m)</li>
          </ul>
        </div>
      </div>
    </ScrollReveal>
  )
}
