import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { DonationButton } from "@/components/ui/donation-button"
import { AnimatedSection } from "@/components/ui/animated-section"
import { BlogSection } from "@/components/sections/blog-section"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="-mt-16 pt-16">
        <AnimatedSection direction="up">
          <BlogSection showHeader={true} />
        </AnimatedSection>
      </main>

      <AnimatedSection>
        <Footer />
      </AnimatedSection>
      <DonationButton href="https://donorbox.org/casa-pjoxante" />
    </div>
  )
}