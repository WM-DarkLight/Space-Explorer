"use client"

import { useEffect, useState } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  once?: boolean
}

export default function AnimatedText({ text, className, delay = 0, speed = 50, once = false }: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (once && isComplete) return

    let timeout: NodeJS.Timeout
    let animationFrame: number

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(`animated-text-${text.slice(0, 10).replace(/\s/g, "")}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(animationFrame)
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [text, once, isComplete])

  useEffect(() => {
    if (!isVisible) return

    let index = 0
    const timeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1))
        index++

        if (index === text.length) {
          clearInterval(intervalId)
          setIsComplete(true)
        }
      }, speed)

      return () => clearInterval(intervalId)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay, speed, isVisible])

  return (
    <span id={`animated-text-${text.slice(0, 10).replace(/\s/g, "")}`} className={className}>
      {displayedText}
    </span>
  )
}
