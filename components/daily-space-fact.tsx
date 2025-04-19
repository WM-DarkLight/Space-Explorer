"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Space facts array
const spaceFacts = [
  "The Sun makes up 99.86% of the mass in the solar system.",
  "One million Earths could fit inside the Sun.",
  "A day on Venus is longer than a year on Venus.",
  "The Great Red Spot on Jupiter has been storming for over 400 years.",
  "Saturn's rings are made mostly of ice and rock.",
  "Neutron stars can rotate up to 600 times per second.",
  "There are more stars in the universe than grains of sand on all the beaches on Earth.",
  "The largest known star, UY Scuti, is more than 1,700 times the size of our Sun.",
  "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
  "The Milky Way galaxy is moving through space at about 2.1 million kilometers per hour.",
  "The Hubble Space Telescope has made more than 1.5 million observations since its launch.",
  "The footprints left by Apollo astronauts on the Moon will likely last for at least 100 million years.",
  "The International Space Station travels at a speed of about 28,000 kilometers per hour.",
  "A black hole with the mass of our Sun would be only about 6 kilometers in diameter.",
  "The core of the Sun reaches temperatures of about 15 million degrees Celsius.",
  "The largest volcano in the solar system is Olympus Mons on Mars, standing at 25 kilometers high.",
  "The Andromeda Galaxy is moving toward our Milky Way and will collide with it in about 4.5 billion years.",
  "There are more than 5,000 confirmed exoplanets (planets outside our solar system).",
  "The coldest place in the universe that we know of is the Boomerang Nebula at -272°C.",
  "The nearest star to our solar system, Proxima Centauri, is 4.24 light-years away.",
  "The Voyager 1 spacecraft is the most distant human-made object, currently over 23 billion kilometers from Earth.",
  "The Moon is moving away from Earth at a rate of about 3.8 centimeters per year.",
  "The largest asteroid in our solar system, Ceres, is about 940 kilometers in diameter.",
  "The Hubble Ultra Deep Field image shows galaxies from over 13 billion years ago.",
  "A teaspoon of neutron star material would weigh about 4 billion tons on Earth.",
  "The Milky Way galaxy contains between 100-400 billion stars.",
  "The first photograph of a black hole was released in 2019, showing M87's supermassive black hole.",
  "The Earth's rotation is gradually slowing down, adding about 1.7 milliseconds to our day every century.",
  "The universe is estimated to contain more than 2 trillion galaxies.",
  "The largest known structure in the universe is the Hercules-Corona Borealis Great Wall, spanning about 10 billion light-years.",
]

// Function to get a fact based on the day or randomly
const fetchRandomFact = (forceRandom = false) => {
  if (forceRandom) {
    // For button clicks, get a truly random fact
    const currentFact = document.getElementById("fact-text")?.textContent
    let newFact

    // Make sure we don't get the same fact twice in a row
    do {
      const randomIndex = Math.floor(Math.random() * spaceFacts.length)
      newFact = spaceFacts[randomIndex]
    } while (newFact === currentFact)

    return newFact
  } else {
    // For initial load, use day-based selection for a consistent "daily" fact
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
    const factIndex = dayOfYear % spaceFacts.length
    return spaceFacts[factIndex]
  }
}

export default function DailySpaceFact() {
  const [fact, setFact] = useState<string>("")

  useEffect(() => {
    // On initial load, get the daily fact
    setFact(fetchRandomFact())
  }, [])

  const handleNewFact = () => {
    // When button is clicked, get a random fact
    setFact(fetchRandomFact(true))
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-slate-900 border-slate-700 text-white">
      <CardHeader>
        <CardTitle className="text-center text-cyan-400">Daily Space Fact</CardTitle>
      </CardHeader>
      <CardContent>
        <p id="fact-text" className="text-center text-lg">
          {fact}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleNewFact} className="bg-cyan-600 hover:bg-cyan-700">
          New Random Fact
        </Button>
      </CardFooter>
    </Card>
  )
}
