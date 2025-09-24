"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { DonationButton } from "@/components/ui/donation-button"
import { BlogSection } from "@/components/sections/blog-section"

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center mb-8">
            Blog de Casa Pjoxante
          </h1>
          <BlogSection showHeader={true} id="blog-main" />
        </div>
      </main>

      <Footer />
      <DonationButton href="https://donorbox.org/casa-pjoxante" />
    </div>
  )
}