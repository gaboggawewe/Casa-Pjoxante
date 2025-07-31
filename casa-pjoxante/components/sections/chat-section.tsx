"use client"

import * as React from "react"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { ChatInterface } from "@/components/ui/chat-interface"
import { COMPONENT_SIZES } from "@/lib/constants"
import { motion, AnimatePresence } from "framer-motion"

interface ChatSectionProps {
  className?: string
}

const suggestions = [
  "¿Qué proyectos tiene la casa?",
  "¿Cómo puedo inscribirme a un curso?",
  "¿Dónde queda ubicada la casa?",
  "¿Qué servicios ofrecen a la comunidad?",
  "¿Puedo participar como voluntario?",
]

const ChatSection = React.forwardRef<HTMLElement, ChatSectionProps>(
  ({ className }, ref) => {
    const [index, setIndex] = React.useState(0)

    React.useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % suggestions.length)
      }, 3500)
      return () => clearInterval(interval)
    }, [])

    return (
      <SectionContainer
        ref={ref}
        id="chat"
        className={cn(className)}
        padding="xl"
      >
        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Side */}
          <div className="text-center space-y-6">
            <h2
              className={cn(
                "text-center font-bold text-black font-cerco flex items-center gap-2 justify-center",
                COMPONENT_SIZES.section.title
              )}
            >
              <MessageCircle className="h-8 w-8 text-pjoxante-primary" />
              Chat con Casa Pjoxante
            </h2>

            <div className="space-y-4">
              <p
                className={cn(
                  "text-black font-century max-w-md mx-auto",
                  COMPONENT_SIZES.section.subtitle
                )}
              >
                ¿Tienes alguna pregunta o quieres conocer más sobre nuestros proyectos? Pregúntale a nuestro chat potenciado por IA.
              </p>

              <div className="relative h-16 sm:h-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6 }}
                    className="text-[#8C6853] italic text-center px-6 py-3 rounded-full bg-[#8C6853]/8 shadow-md text-base sm:text-lg font-cerco max-w-xl"
                  >
                    “{suggestions[index]}”
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full max-w-xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </SectionContainer>
    )
  }
)
ChatSection.displayName = "ChatSection"

export { ChatSection }
