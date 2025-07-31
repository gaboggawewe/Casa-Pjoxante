"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { ChatInterface } from "@/components/ui/chat-interface"
import { COMPONENT_SIZES } from "@/lib/constants"

interface ChatSectionProps {
  className?: string
}

const ChatSection = React.forwardRef<HTMLElement, ChatSectionProps>(
  ({ className }, ref) => {
    return (
      <SectionContainer
        ref={ref}
        id="chat"
        className={cn(className)}
        padding="xl"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={cn(
            "font-bold text-pjoxante-green font-cerco mb-4",
            COMPONENT_SIZES.section.title
          )}>
            Conversemos
          </h2>
          <p className={cn(
            "text-gray-600 font-century max-w-3xl mx-auto",
            COMPONENT_SIZES.section.subtitle
          )}>
            ¿Tienes alguna pregunta o quieres conocer más sobre nuestros proyectos? 
            Escríbenos y te responderemos lo antes posible.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white to-pjoxante-green-light/10 rounded-xl p-8 shadow-lg border border-pjoxante-green-light/50 hover:shadow-xl transition-all duration-300">
            <ChatInterface className="mx-auto" />
          </div>
        </div>
      </SectionContainer>
    )
  }
)
ChatSection.displayName = "ChatSection"

export { ChatSection }