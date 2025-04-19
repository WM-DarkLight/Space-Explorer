"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  className,
  threshold = 0.1,
  delay = 0,
  direction = "up",
  distance = 20,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let translateX = 0
    let translateY = 0

    switch (direction) {
      case "up":
        translateY = distance
        break
      case "down":
        translateY = -distance
        break
      case "left":
        translateX = distance
        break
      case "right":
        translateX = -distance
        break
    }

    element.style.transform = `translate(${translateX}px, ${translateY}px)`
    element.style.opacity = "0"
    element.style.transition = `transform 0.6s ease-out ${delay}ms, opacity 0.6s ease-out ${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.transform = "translate(0, 0)"
          element.style.opacity = "1"

          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          element.style.transform = `translate(${translateX}px, ${translateY}px)`
          element.style.opacity = "0"
        }
      },
      { threshold },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, delay, direction, distance, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
