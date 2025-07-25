"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAVIGATION_ITEMS } from "@/lib/constants"
import { PjoxanteButton } from "./pjoxante-button"

interface NavbarProps {
  className?: string
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
      <nav ref={ref} className={cn("sticky top-0 z-40 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border", className)}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="font-bold text-xl text-pjoxante-green font-cerco">
                Casa Pjoxante
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-pjoxante-green hover:bg-pjoxante-green-light/50 rounded-md transition-colors font-century"
                >
                  {item.label}
                </Link>
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
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pjoxante-green hover:bg-pjoxante-green-light/50 rounded-md transition-colors font-century"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
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