"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
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


    return (
      <section
        ref={ref}
        className={cn("relative overflow-hidden w-full", className)}
      >
        {/* Background Image with Gradient Fade - Full Width */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
          }}
        >
          <Image
            src="/FotosCasaPjoxante/collage_pjoxante.jpg"
            alt="Casa Pjoxante Background"
            fill
            className="object-cover opacity-35"
            priority
          />
          {/* Additional overlay for better text readability */}
          <div className="absolute inset-0 bg-white/40"></div>
        </div>
        
        {/* Content Container with Padding */}
        <div className="relative z-10 py-12 px-6 lg:px-8 mx-auto max-w-7xl">
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
        </div>
      </section>
    )
  }
)
HeroSection.displayName = "HeroSection"

export { HeroSection }