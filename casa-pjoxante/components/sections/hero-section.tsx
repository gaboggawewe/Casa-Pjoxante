"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { COMPONENT_SIZES } from "@/lib/constants"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { useRouter, usePathname } from "next/navigation"

interface HeroSectionProps {
  className?: string
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ className }, ref) => {
    const { scrollToSection } = useSmoothScroll()
    const router = useRouter()
    const pathname = usePathname()

    const handleNavClick = (href: string) => {
      if (href.startsWith('#')) {
        const sectionId = href.substring(1)
        
        // Si no estamos en la página principal, navegar primero
        if (pathname !== '/') {
          router.push(`/${href}`)
        } else {
          // Si estamos en la página principal, hacer scroll suave
          scrollToSection(sectionId)
        }
      }
    }

    return (
      <SectionContainer
        ref={ref} 
        as="section"
        className={cn(className)}
        padding="lg"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="flex justify-center">
              <Image
                src="/LogosCasaPjoxante/Casa Pjoxante logo 2.png"
                alt="Casa Pjoxante"
                width={500}
                height={375}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex justify-center">
              <p className="pjoxante-bg-primary-light pjoxante-primary rounded-md px-3 py-1 font-bold text-lg md:text-md inline-block">
                <span className="font-bold">Casa de Estudios, Investigación y Promoción del Buen Vivir</span> 
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 pt-6 mt-8 border-t border-pjoxante-green-light">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-pjoxante-green">15+</div>
              <div className="text-sm text-gray-600">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-pjoxante-green">500+</div>
              <div className="text-sm text-gray-600">Familias beneficiadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-pjoxante-green">25+</div>
              <div className="text-sm text-gray-600">Proyectos activos</div>
            </div>
          </div>
        </div>
      </SectionContainer>
    )
  }
)
HeroSection.displayName = "HeroSection"

export { HeroSection }