"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { useRouter, usePathname } from "next/navigation"
import { getHeroData } from "@/services/hero/hero-service"
import type { HeroData } from "@/services/hero/hero-types"

interface HeroSectionProps {
  className?: string
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ className }, ref) => {
    const { scrollToSection } = useSmoothScroll()
    const router = useRouter()
    const pathname = usePathname()
    
    const [heroData, setHeroData] = useState<HeroData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const loadHeroData = async () => {
        try {
          const result = await getHeroData()
          if (result.data) {
            setHeroData(result.data)
          }
        } catch (error) {
          console.error('Error loading hero data:', error)
        } finally {
          setLoading(false)
        }
      }

      loadHeroData()
    }, [])

    // Si está cargando, mostrar un loader simple
    if (loading) {
      return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pjoxante-green mx-auto"></div>
            <p className="mt-2 text-gray-600">Cargando...</p>
          </div>
        </section>
      )
    }

    // Si no hay datos, usar valores por defecto
    const section = heroData?.section || {
      title: 'Casa de Estudios, Investigación y Promoción del Buen Vivir',
      subtitle: '',
      logo_url: '/LogosCasaPjoxante/Casa Pjoxante logo 2.png',
      background_image_url: '/FotosCasaPjoxante/collage_pjoxante.jpg',
      beneficiaries: 696,
      events: 6,
      active_projects: 5
    }

    return (
      <section
        ref={ref}
        className={cn("relative overflow-hidden w-full min-h-screen", className)}
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
            src={section.background_image_url}
            alt="Casa Pjoxante Background"
            fill
            className="object-cover opacity-35"
            priority
          />
          {/* Additional overlay for better text readability */}
          <div className="absolute inset-0 bg-white/40"></div>
        </div>
        
        {/* Content Container with Padding */}
        <div className="relative z-10 pt-20 pb-12 px-6 lg:px-8 mx-auto max-w-7xl flex items-center min-h-screen">
          <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="flex justify-center">
              <Image
                src={section.logo_url}
                alt="Casa Pjoxante"
                width={500}
                height={375}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex justify-center">
              <p className="pjoxante-bg-primary-light pjoxante-primary rounded-md px-3 py-1 font-bold text-lg md:text-md inline-block">
                <span className="font-bold">{section.title}</span>
                {section.subtitle && <span className="block text-sm mt-1">{section.subtitle}</span>}
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 pt-6 mt-8 border-t border-pjoxante-green-light">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-pjoxante-green">{section.beneficiaries}</div>
              <div className="text-sm text-gray-600">Beneficiarios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-pjoxante-green">{section.events}</div>
              <div className="text-sm text-gray-600">Eventos realizados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-pjoxante-green">{section.active_projects}</div>
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