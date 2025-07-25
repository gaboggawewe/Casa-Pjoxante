"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PjoxanteButton } from "./pjoxante-button"

interface CarouselImage {
  src: string
  alt: string
  title?: string
  description?: string
}

interface PhotoCarouselProps {
  images: CarouselImage[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
  showArrows?: boolean
}

const PhotoCarousel = React.forwardRef<HTMLDivElement, PhotoCarouselProps>(
  ({ 
    images, 
    className, 
    autoPlay = true, 
    autoPlayInterval = 5000,
    showIndicators = true,
    showArrows = true
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Auto-play functionality
    useEffect(() => {
      if (!autoPlay || images.length <= 1) return

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }, [autoPlay, autoPlayInterval, images.length])

    const goToPrevious = () => {
      setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
    }

    const goToNext = () => {
      setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
    }

    const goToSlide = (index: number) => {
      setCurrentIndex(index)
    }

    if (!images.length) {
      return (
        <div className={cn("bg-gray-200 rounded-lg h-64 flex items-center justify-center", className)}>
          <p className="text-gray-500">No hay imágenes para mostrar</p>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("relative overflow-hidden rounded-lg", className)}>
        {/* Main image container */}
        <div className="relative h-64 md:h-80 lg:h-96">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Image overlay with title/description */}
                {(image.title || image.description) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="text-white p-6">
                      {image.title && (
                        <h3 className="text-lg md:text-xl font-semibold mb-2">
                          {image.title}
                        </h3>
                      )}
                      {image.description && (
                        <p className="text-sm md:text-base opacity-90">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        {showArrows && images.length > 1 && (
          <>
            <PjoxanteButton
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </PjoxanteButton>
            <PjoxanteButton
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </PjoxanteButton>
          </>
        )}

        {/* Indicators */}
        {showIndicators && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-200",
                    index === currentIndex
                      ? "bg-pjoxante-green scale-110"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)
PhotoCarousel.displayName = "PhotoCarousel"

export { PhotoCarousel, type CarouselImage }