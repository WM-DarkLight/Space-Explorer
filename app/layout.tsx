import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import ReadingProgress from "@/components/reading-progress"
import FloatingActionButton from "@/components/floating-action-button"
import AccessibilityControls from "@/components/accessibility-controls"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Space Explorer",
  description: "Discover the wonders of space and science",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <ReadingProgress />
            <ParticleBackground />
            <div className="flex flex-col min-h-screen">
              <Header />
              {children}
              <Footer />
            </div>
            <FloatingActionButton />
            <AccessibilityControls />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
