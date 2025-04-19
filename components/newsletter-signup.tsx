"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      setMessage("Thank you for subscribing to our newsletter!")
      setEmail("")
    }, 1500)
  }

  return (
    <ScrollReveal direction="up" className="rounded-lg border border-purple-500/20 bg-black/60 p-6 backdrop-blur-sm">
      <div className="mb-4 text-center">
        <h3 className="mb-2 text-xl font-bold">Stay Updated</h3>
        <p className="text-gray-400">Subscribe to our newsletter for the latest space discoveries and articles</p>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center rounded-lg bg-green-500/10 p-4 text-center">
          <CheckCircle className="mb-2 h-8 w-8 text-green-500" />
          <p className="text-green-400">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/40 pr-12"
              disabled={status === "loading"}
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1 h-8 bg-purple-600 hover:bg-purple-700"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          {status === "error" && (
            <div className="flex items-center text-xs text-red-400">
              <AlertCircle className="mr-1 h-3 w-3" />
              {message}
            </div>
          )}

          <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
        </form>
      )}
    </ScrollReveal>
  )
}
