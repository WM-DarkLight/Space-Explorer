"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category?: string
  relatedTerms?: string[]
  link?: string
}

export default function SpaceGlossary() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [expandedTerms, setExpandedTerms] = useState<string[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchTerms = () => {
      // Sample glossary terms
      const sampleTerms: GlossaryTerm[] = [
        {
          id: "asteroid",
          term: "Asteroid",
          definition:
            "A small rocky body orbiting the Sun. Large numbers of these are found between the orbits of Mars and Jupiter (the main asteroid belt).",
          category: "solar-system",
          relatedTerms: ["meteor", "meteorite"],
        },
        {
          id: "black-hole",
          term: "Black Hole",
          definition:
            "A region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it.",
          category: "astrophysics",
          relatedTerms: ["event-horizon", "singularity"],
          link: "/topics/black-holes",
        },
        {
          id: "comet",
          term: "Comet",
          definition:
            "An icy, small Solar System body that, when passing close to the Sun, warms and begins to release gases, a process called outgassing. This produces a visible atmosphere or coma, and sometimes also a tail.",
          category: "solar-system",
          relatedTerms: ["oort-cloud", "kuiper-belt"],
        },
        {
          id: "dark-matter",
          term: "Dark Matter",
          definition:
            "A hypothetical form of matter that is thought to account for approximately 85% of the matter in the universe and about 27% of its total mass–energy density. It has not been directly observed, but its existence would explain many astronomical observations.",
          category: "cosmology",
          relatedTerms: ["dark-energy", "galaxy-rotation"],
          link: "/topics/dark-matter",
        },
        {
          id: "event-horizon",
          term: "Event Horizon",
          definition:
            "The boundary defining the region of space around a black hole from which nothing (not even light) can escape. Once a particle or light wave enters the event horizon, it cannot exit.",
          category: "astrophysics",
          relatedTerms: ["black-hole", "singularity"],
        },
        {
          id: "galaxy",
          term: "Galaxy",
          definition:
            "A gravitationally bound system of stars, stellar remnants, interstellar gas, dust, and dark matter. Examples include the Milky Way, Andromeda, and the Triangulum Galaxy.",
          category: "astronomy",
          relatedTerms: ["milky-way", "andromeda"],
          link: "/topics/galaxies",
        },
        {
          id: "habitable-zone",
          term: "Habitable Zone",
          definition:
            "The range of orbits around a star within which a planetary surface can support liquid water given sufficient atmospheric pressure. Also known as the 'Goldilocks zone'.",
          category: "exoplanets",
          relatedTerms: ["exoplanet", "earth-like"],
        },
        {
          id: "interstellar",
          term: "Interstellar",
          definition: "The space between stars within a galaxy. The interstellar medium consists of gas and dust.",
          category: "astronomy",
          relatedTerms: ["interstellar-medium", "light-year"],
        },
        {
          id: "kuiper-belt",
          term: "Kuiper Belt",
          definition:
            "A circumstellar disc in the outer Solar System, extending from the orbit of Neptune to approximately 50 AU from the Sun. It is similar to the asteroid belt, but is far larger and consists mainly of small bodies composed primarily of ice.",
          category: "solar-system",
          relatedTerms: ["pluto", "dwarf-planet"],
        },
        {
          id: "light-year",
          term: "Light-year",
          definition:
            "The distance that light travels in vacuum in one Julian year (365.25 days). It is approximately 9.46 trillion kilometers or 5.88 trillion miles.",
          category: "astronomy",
          relatedTerms: ["parsec", "astronomical-unit"],
        },
        {
          id: "meteor",
          term: "Meteor",
          definition:
            "The visible path of a meteoroid as it enters the atmosphere. Meteors are commonly known as 'shooting stars' or 'falling stars'.",
          category: "solar-system",
          relatedTerms: ["meteoroid", "meteorite"],
        },
        {
          id: "nebula",
          term: "Nebula",
          definition:
            "An interstellar cloud of dust, hydrogen, helium and other ionized gases. Originally, the term was used to describe any diffuse astronomical object, including galaxies beyond the Milky Way.",
          category: "astronomy",
          relatedTerms: ["star-formation", "supernova-remnant"],
        },
        {
          id: "oort-cloud",
          term: "Oort Cloud",
          definition:
            "A theoretical cloud of predominantly icy planetesimals believed to surround the Sun at distances ranging from 2,000 to 100,000 astronomical units.",
          category: "solar-system",
          relatedTerms: ["comet", "kuiper-belt"],
        },
        {
          id: "pulsar",
          term: "Pulsar",
          definition:
            "A highly magnetized rotating neutron star that emits beams of electromagnetic radiation out of its magnetic poles. This radiation can be observed only when a beam is pointing toward Earth.",
          category: "stellar-objects",
          relatedTerms: ["neutron-star", "supernova"],
        },
        {
          id: "quasar",
          term: "Quasar",
          definition:
            "An extremely luminous active galactic nucleus, powered by a supermassive black hole with mass ranging from millions to billions of times the mass of the Sun.",
          category: "galaxies",
          relatedTerms: ["black-hole", "active-galactic-nucleus"],
        },
        {
          id: "red-dwarf",
          term: "Red Dwarf",
          definition:
            "A small, relatively cool star on the main sequence. Red dwarfs are the most common type of star in the Milky Way, at least in the neighborhood of the Sun.",
          category: "stellar-objects",
          relatedTerms: ["main-sequence", "stellar-classification"],
        },
        {
          id: "supernova",
          term: "Supernova",
          definition:
            "The explosion of a star that briefly outshines an entire galaxy, radiating as much energy as the Sun or any ordinary star is expected to emit over its entire life span.",
          category: "stellar-objects",
          relatedTerms: ["neutron-star", "black-hole"],
        },
        {
          id: "telescope",
          term: "Telescope",
          definition:
            "An optical instrument designed to make distant objects appear magnified by using an arrangement of lenses or curved mirrors and lenses, or various devices used to observe distant objects by their emission, absorption, or reflection of electromagnetic radiation.",
          category: "technology",
          relatedTerms: ["hubble", "james-webb"],
        },
        {
          id: "universe",
          term: "Universe",
          definition:
            "All of space and time and their contents, including planets, stars, galaxies, and all other forms of matter and energy.",
          category: "cosmology",
          relatedTerms: ["big-bang", "cosmic-microwave-background"],
        },
        {
          id: "wormhole",
          term: "Wormhole",
          definition:
            "A theoretical passage through space-time that could create shortcuts for long journeys across the universe. Wormholes are predicted by the theory of general relativity.",
          category: "theoretical-physics",
          relatedTerms: ["einstein-rosen-bridge", "time-travel"],
        },
        {
          id: "x-ray-astronomy",
          term: "X-ray Astronomy",
          definition:
            "The study of astronomical objects and phenomena that emit X-rays. X-ray emission is expected from sources with extremely hot gases, such as galaxy clusters, or from powerful magnetic fields.",
          category: "astronomy",
          relatedTerms: ["chandra", "neutron-star"],
        },
        {
          id: "zodiacal-light",
          term: "Zodiacal Light",
          definition:
            "A faint, diffuse, and roughly triangular white glow visible in the night sky that appears to extend from the Sun's direction and is caused by sunlight scattered by space dust in the zodiacal cloud.",
          category: "astronomy",
          relatedTerms: ["interplanetary-dust", "solar-system"],
        },
      ]

      // Sort terms alphabetically
      const sortedTerms = sampleTerms.sort((a, b) => a.term.localeCompare(b.term))
      setTerms(sortedTerms)
    }

    fetchTerms()
  }, [])

  // Get all unique first letters
  const alphabet = Array.from(new Set(terms.map((term) => term.term[0].toUpperCase())))
    .sort()
    .filter((letter) => /[A-Z]/.test(letter))

  // Filter terms based on search and selected letter
  const filteredTerms = terms.filter((term) => {
    const matchesSearch =
      searchTerm === "" ||
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLetter = !selectedLetter || term.term[0].toUpperCase() === selectedLetter

    return matchesSearch && matchesLetter
  })

  // Group terms by first letter
  const groupedTerms: Record<string, GlossaryTerm[]> = {}

  filteredTerms.forEach((term) => {
    const firstLetter = term.term[0].toUpperCase()
    if (!groupedTerms[firstLetter]) {
      groupedTerms[firstLetter] = []
    }
    groupedTerms[firstLetter].push(term)
  })

  // Toggle term expansion
  const toggleTerm = (id: string) => {
    if (expandedTerms.includes(id)) {
      setExpandedTerms(expandedTerms.filter((termId) => termId !== id))
    } else {
      setExpandedTerms([...expandedTerms, id])
    }
  }

  return (
    <div className="bg-black/40 rounded-lg border border-purple-500/20 p-4 md:p-6">
      <h2 className="text-xl font-bold mb-6">Space & Astronomy Glossary</h2>

      {/* Search and filter */}
      <div className="mb-6">
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setSelectedLetter(null) // Clear letter filter when searching
            }}
            className="pl-10 bg-black/40 border-purple-500/30"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedLetter ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLetter(null)}
            className={
              !selectedLetter ? "bg-purple-600 hover:bg-purple-700" : "border-purple-500/30 hover:bg-purple-500/20"
            }
          >
            All
          </Button>

          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLetter(letter)}
              className={
                selectedLetter === letter
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-purple-500/30 hover:bg-purple-500/20"
              }
            >
              {letter}
            </Button>
          ))}
        </div>
      </div>

      {/* Glossary content */}
      {Object.keys(groupedTerms).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedTerms)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, letterTerms]) => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                <div className="sticky top-20 z-10 bg-purple-600 text-white font-bold text-xl px-4 py-2 rounded-md mb-4">
                  {letter}
                </div>

                <div className="space-y-4">
                  {letterTerms.map((term) => (
                    <ScrollReveal key={term.id} className="border border-purple-500/20 rounded-lg overflow-hidden">
                      <div
                        onClick={() => toggleTerm(term.id)}
                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-purple-500/10"
                      >
                        <h3 className="text-lg font-medium">{term.term}</h3>
                        <div className="text-purple-400">
                          {expandedTerms.includes(term.id) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 15l-6-6-6 6" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {expandedTerms.includes(term.id) && (
                        <div className="p-4 pt-0 border-t border-purple-500/20 bg-black/20">
                          <p className="text-gray-300 mb-3">{term.definition}</p>

                          {term.category && (
                            <div className="text-sm text-gray-400 mb-2">
                              <span className="font-medium">Category:</span>{" "}
                              {term.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </div>
                          )}

                          {term.relatedTerms && term.relatedTerms.length > 0 && (
                            <div className="mb-3">
                              <span className="text-sm font-medium text-gray-400">Related terms: </span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {term.relatedTerms.map((relatedTerm) => {
                                  const relatedTermObj = terms.find((t) => t.id === relatedTerm)
                                  return (
                                    <button
                                      key={relatedTerm}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        const element = document.getElementById(relatedTerm)
                                        if (element) {
                                          element.scrollIntoView({ behavior: "smooth" })
                                          if (!expandedTerms.includes(relatedTerm)) {
                                            toggleTerm(relatedTerm)
                                          }
                                        }
                                      }}
                                      className="text-sm text-purple-400 hover:text-purple-300 hover:underline"
                                    >
                                      {relatedTermObj?.term || relatedTerm.replace(/-/g, " ")}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {term.link && (
                            <a
                              href={term.link}
                              className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Learn more about {term.term}
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No terms found matching your search.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("")
              setSelectedLetter(null)
            }}
            className="text-purple-400 mt-2"
          >
            Clear search
          </Button>
        </div>
      )}
    </div>
  )
}
