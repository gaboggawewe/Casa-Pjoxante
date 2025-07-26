"use client"

import { useCallback, useRef } from 'react'
import { animate } from 'framer-motion'

export const useSmoothScroll = () => {
  const animationRef = useRef<any>(null)
  const userScrollingRef = useRef(false)

  const scrollToSection = useCallback((sectionId: string) => {
    console.log(`Scrolling to: ${sectionId}`)
    
    // Cancelar animación anterior si existe
    if (animationRef.current) {
      animationRef.current.stop()
    }

    // Resetear flag de scroll manual
    userScrollingRef.current = false
    
    // Listener para detectar scroll manual del usuario
    const handleUserScroll = () => {
      if (!userScrollingRef.current) {
        userScrollingRef.current = true
        console.log('User manual scroll detected, canceling animation')
        if (animationRef.current) {
          animationRef.current.stop()
        }
        window.removeEventListener('wheel', handleUserScroll)
        window.removeEventListener('touchmove', handleUserScroll)
        window.removeEventListener('keydown', handleKeyScroll)
      }
    }

    const handleKeyScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        handleUserScroll()
      }
    }

    // Agregar listeners para detectar scroll manual
    window.addEventListener('wheel', handleUserScroll, { passive: true })
    window.addEventListener('touchmove', handleUserScroll, { passive: true })
    window.addEventListener('keydown', handleKeyScroll)
    
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (!element) {
        console.warn(`Element with id "${sectionId}" not found`)
        return
      }

      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const targetPosition = Math.max(0, elementTop - 80)
      const startPosition = window.scrollY
      
      console.log(`Scrolling from ${startPosition} to ${targetPosition}`)
      
      animationRef.current = animate(startPosition, targetPosition, {
        type: "spring",
        damping: 20,
        stiffness: 60,
        duration: 1.2,
        onUpdate: (value) => {
          if (!userScrollingRef.current) {
            window.scrollTo(0, value)
          }
        },
        onComplete: () => {
          window.removeEventListener('wheel', handleUserScroll)
          window.removeEventListener('touchmove', handleUserScroll)
          window.removeEventListener('keydown', handleKeyScroll)
          console.log(`Scroll animation completed`)
          animationRef.current = null
        }
      })
    }, 100)
  }, [])

  return { scrollToSection }
}