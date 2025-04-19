"use client"

import { useEffect, useState } from "react"

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const currentPosition = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setProgress(Number((currentPosition / scrollHeight).toFixed(2)) * 100)
      }
    }

    window.addEventListener("scroll", updateProgress)
    updateProgress()

    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full bg-black/20">
      <div
        className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
