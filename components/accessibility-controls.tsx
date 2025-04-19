"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Accessibility, Type, ZoomIn, ZoomOut, Contrast, Pause, Play, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100) // percentage
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [dyslexicFont, setDyslexicFont] = useState(false)

  // Apply accessibility settings when they change
  useEffect(() => {
    // Font size
    document.documentElement.style.fontSize = `${fontSize}%`

    // High contrast
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    // Reduced motion
    if (reducedMotion) {
      document.documentElement.classList.add("reduced-motion")
    } else {
      document.documentElement.classList.remove("reduced-motion")
    }

    // Dyslexic-friendly font
    if (dyslexicFont) {
      document.documentElement.classList.add("dyslexic-font")
    } else {
      document.documentElement.classList.remove("dyslexic-font")
    }

    // Save settings to localStorage
    const settings = { fontSize, highContrast, reducedMotion, dyslexicFont }
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))
  }, [fontSize, highContrast, reducedMotion, dyslexicFont])

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibility-settings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setFontSize(settings.fontSize || 100)
      setHighContrast(settings.highContrast || false)
      setReducedMotion(settings.reducedMotion || false)
      setDyslexicFont(settings.dyslexicFont || false)
    }
  }, [])

  // Reset all settings to default
  const resetSettings = () => {
    setFontSize(100)
    setHighContrast(false)
    setReducedMotion(false)
    setDyslexicFont(false)
  }

  // Increase/decrease font size
  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const newSize = prev + delta
      return Math.min(Math.max(newSize, 80), 150) // Limit between 80% and 150%
    })
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "rounded-full h-12 w-12 flex items-center justify-center shadow-lg",
          isOpen ? "bg-purple-700 hover:bg-purple-800" : "bg-purple-600 hover:bg-purple-700",
        )}
        aria-label="Accessibility options"
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-black/90 border border-purple-500/30 rounded-lg p-4 w-72 backdrop-blur-sm shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white flex items-center">
              <Accessibility className="h-4 w-4 mr-2" />
              Accessibility
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Font size controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm flex items-center">
                  <Type className="h-4 w-4 mr-2" />
                  Text Size
                </label>
                <span className="text-xs bg-purple-500/20 px-2 py-1 rounded text-purple-300">{fontSize}%</span>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => changeFontSize(-10)}
                  className="h-8 w-8 border-purple-500/30 hover:bg-purple-500/20"
                  aria-label="Decrease font size"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <div className="flex-1 mx-2 h-2 bg-purple-500/20 rounded-full">
                  <div
                    className="h-2 bg-purple-500 rounded-full"
                    style={{ width: `${((fontSize - 80) / 70) * 100}%` }}
                  ></div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => changeFontSize(10)}
                  className="h-8 w-8 border-purple-500/30 hover:bg-purple-500/20"
                  aria-label="Increase font size"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Toggle options */}
            <div className="space-y-2">
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={cn(
                  "flex items-center justify-between w-full p-2 rounded text-sm",
                  highContrast ? "bg-purple-500/20 text-purple-300" : "hover:bg-purple-500/10",
                )}
              >
                <span className="flex items-center">
                  <Contrast className="h-4 w-4 mr-2" />
                  High Contrast
                </span>
                <div className={cn("w-8 h-4 rounded-full relative", highContrast ? "bg-purple-600" : "bg-gray-700")}>
                  <div
                    className={cn(
                      "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform",
                      highContrast ? "translate-x-4" : "translate-x-0.5",
                    )}
                  ></div>
                </div>
              </button>

              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={cn(
                  "flex items-center justify-between w-full p-2 rounded text-sm",
                  reducedMotion ? "bg-purple-500/20 text-purple-300" : "hover:bg-purple-500/10",
                )}
              >
                <span className="flex items-center">
                  {reducedMotion ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  Reduce Motion
                </span>
                <div className={cn("w-8 h-4 rounded-full relative", reducedMotion ? "bg-purple-600" : "bg-gray-700")}>
                  <div
                    className={cn(
                      "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform",
                      reducedMotion ? "translate-x-4" : "translate-x-0.5",
                    )}
                  ></div>
                </div>
              </button>

              <button
                onClick={() => setDyslexicFont(!dyslexicFont)}
                className={cn(
                  "flex items-center justify-between w-full p-2 rounded text-sm",
                  dyslexicFont ? "bg-purple-500/20 text-purple-300" : "hover:bg-purple-500/10",
                )}
              >
                <span className="flex items-center">
                  <Type className="h-4 w-4 mr-2" />
                  Dyslexia-friendly Font
                </span>
                <div className={cn("w-8 h-4 rounded-full relative", dyslexicFont ? "bg-purple-600" : "bg-gray-700")}>
                  <div
                    className={cn(
                      "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform",
                      dyslexicFont ? "translate-x-4" : "translate-x-0.5",
                    )}
                  ></div>
                </div>
              </button>
            </div>

            {/* Reset button */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetSettings}
              className="w-full border-purple-500/30 hover:bg-purple-500/20"
            >
              Reset to Default
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
