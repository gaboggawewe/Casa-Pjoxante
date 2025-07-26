"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAVIGATION_ITEMS } from "@/lib/constants"
import { PjoxanteButton } from "./pjoxante-button"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { useRouter, usePathname } from "next/navigation"

interface NavbarProps {
  className?: string
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { scrollToSection } = useSmoothScroll()
    const router = useRouter()
    const pathname = usePathname()

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

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
      <nav ref={ref} className={cn("sticky top-0 z-40 w-full backdrop-blur border-b border-border", className)}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => {
                if (pathname !== '/') {
                  router.push('/')
                } else {
                  scrollToSection('inicio')
                }
              }}
              className="flex items-center space-x-3 cursor-pointer"
            >
            <img
              src="/LogosCasaPjoxante/Casa%20Pjoxante%20isotipo.png"
              alt="Logo Casa Pjoxante"
              className="h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
              <div className="font-bold text-xl text-black font-cerco">
                Casa Pjoxante
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {NAVIGATION_ITEMS.map((item) => (
                item.href.startsWith('#') ? (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="px-3 py-2 text-sm font-normal text-black rounded-md 
                    hover:underline
                    hover:drop-shadow-lg transition duration-300 transform 
                    hover:-translate-y-0.5 font-century"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-3 py-2 text-sm font-normal text-black rounded-md 
                    hover:underline
                    hover:drop-shadow-lg transition duration-300 transform 
                    hover:-translate-y-0.5 font-century"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <PjoxanteButton
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </PjoxanteButton>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1 pjoxante-bg-primary-light">
                {NAVIGATION_ITEMS.map((item) => (
                  item.href.startsWith('#') ? (
                    <button
                      key={item.label}
                      onClick={() => {
                        handleNavClick(item.href)
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-pjoxante-green hover:bg-pjoxante-green-light/50 rounded-md transition-colors font-century"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pjoxante-green hover:bg-pjoxante-green-light/50 rounded-md transition-colors font-century"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    )
  }
)
Navbar.displayName = "Navbar"

export { Navbar }