"use client"

import * as React from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "./section-container"
import { NAVIGATION_ITEMS, CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants"

interface FooterProps {
  className?: string
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className }, ref) => {
    const socialIcons = {
      facebook: Facebook,
      twitter: Twitter,
      instagram: Instagram,
      linkedin: Linkedin,
    }

    return (
      <footer ref={ref} className={cn("bg-pjoxante-green text-black", className)}>
        <SectionContainer padding="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="font-bold text-xl font-cerco mb-2">Casa Pjoxante</h3>
                <p className="text-pjoxante-green-light text-sm leading-relaxed font-century">
                  {CONTACT_INFO.description}
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a 
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="hover:text-pjoxante-green-light transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a 
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="hover:text-pjoxante-green-light transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{CONTACT_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg font-cerco">Enlaces Rápidos</h4>
              <nav className="flex flex-col space-y-2">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-pjoxante-green-light hover:text-white transition-colors font-century"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg font-cerco">Síguenos</h4>
              <div className="flex space-x-4">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                  const IconComponent = socialIcons[platform as keyof typeof socialIcons]
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-pjoxante-green-light/20 rounded-full flex items-center justify-center hover:bg-white hover:text-pjoxante-green transition-all duration-300"
                      aria-label={`Síguenos en ${platform}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6">
                <h5 className="font-medium text-sm mb-3 font-cerco">Mantente informado</h5>
                <p className="text-xs text-pjoxante-green-light mb-3">
                  Recibe noticias sobre nuestros proyectos y actividades
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="flex-1 px-3 py-2 text-sm text-gray-900 rounded-l-md border-0 focus:ring-2 focus:ring-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pjoxante-brown-light hover:bg-pjoxante-brown-medium text-white text-sm rounded-r-md transition-colors"
                  >
                    Suscribirse
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-pjoxante-green-light/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-pjoxante-green-light">
            <div className="font-century">
              © 2024 Casa Pjoxante. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-white transition-colors">
                Términos de Uso
              </Link>
            </div>
          </div>
        </SectionContainer>
      </footer>
    )
  }
)
Footer.displayName = "Footer"

export { Footer }