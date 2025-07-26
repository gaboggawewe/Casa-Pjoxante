"use client"

import * as React from "react"
import { useState } from "react"
import { MessageCircle, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { COMPONENT_SIZES } from "@/lib/constants"

interface HeroSectionProps {
  className?: string
}

interface ChatMessage {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ className }, ref) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
      {
        id: "welcome",
        text: "¡Hablemos! Nuestro asistente está aquí para ayudarte. Mientras tanto, puedes explorar más sobre nuestros programas...",
        sender: "assistant",
        timestamp: new Date()
      }
    ])
    const [inputMessage, setInputMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Mock function - will be replaced with n8n integration
    const sendMessageToN8N = async (message: string): Promise<string> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock responses based on keywords
      const lowerMessage = message.toLowerCase()
      if (lowerMessage.includes("curso") || lowerMessage.includes("taller")) {
        return "¡Excelente! Ofrecemos varios cursos relacionados con educación comunitaria, arte y salud. ¿Te interesa algún tema en particular?"
      } else if (lowerMessage.includes("beca") || lowerMessage.includes("apoyo")) {
        return "Tenemos programas de apoyo y becas disponibles. Te puedo conectar con nuestro equipo para más información."
      } else if (lowerMessage.includes("contacto") || lowerMessage.includes("ubicación")) {
        return "Puedes contactarnos en info@casapjoxante.org o visitar nuestra sede en Ciudad de México. ¿Te gustaría agendar una cita?"
      } else {
        return "Gracias por tu mensaje. Un miembro de nuestro equipo te proporcionará información detallada. ¿Hay algo específico en lo que te pueda ayudar?"
      }
    }

    const handleSendMessage = async () => {
      if (!inputMessage.trim()) return

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage])
      setInputMessage("")
      setIsLoading(true)

      try {
        const response = await sendMessageToN8N(inputMessage)
        
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: "assistant", 
          timestamp: new Date()
        }

        setMessages(prev => [...prev, assistantMessage])
      } catch (error) {
        console.error("Error sending message:", error)
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "Lo siento, hubo un problema. Por favor intenta de nuevo.",
          sender: "assistant",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    }

    return (
      <SectionContainer
        ref={ref} 
        as="section"
        className={cn("bg-gradient-to-br from-pjoxante-green-light/30 to-white", className)}
        padding="xl"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className={cn(
                "font-bold text-pjoxante-green font-cerco leading-tight",
                COMPONENT_SIZES.hero.title
              )}>
                Casa Pjoxante
              </h1>
              <p className="pjoxante-bg-primary-light pjoxante-primary rounded-md px-3 py-1 font-bold text-lg md:text-md">
              <span className="font-bold ">˖✧ </span>
              <span className="font-bold">Casa de Estudios, Investigación y Promoción del Buen Vivir</span> 
              </p>
              <p className={cn(
                "text-black font-century max-w-2xl",
                COMPONENT_SIZES.hero.subtitle
              )}>
                <span className="font-normal ">Construímos un futuro mejor junto con las comunidades a través de la </span>
                <span className="font-bold pjoxante-primary">solidaridad, 
                unidad, trabajo y ecología en equipo. </span>
                <span className="font-normal ">Promovemos un futuro sostenible y en armonía con la naturaleza. </span>

              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <PjoxanteButton size="lg" className="text-lg pjoxante-bg-primary font-bold text-white transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                Conoce Más ➜
              </PjoxanteButton>
              <PjoxanteButton variant="outline" size="lg" className="text-lg pjoxante-bg-primary font-bold text-white transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                ¡Únete a la Comunidad!
              </PjoxanteButton>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-pjoxante-green-light">
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

          {/* Right Column - Chat Interface */}
          <div className="lg:pl-8">
            <Card className="w-full max-w-md mx-auto bg-white shadow-xl border-pjoxante-green-light">
              <div className="bg-pjoxante-green text-white p-4 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <h3 className="font-medium text-black">¡Hablemos!</h3>
                </div>
                <p className="text-sm text-black mt-1">
                  Nuestro asistente está aquí para ayudarte
                </p>
              </div>
              
              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-lg p-3 text-sm",
                          message.sender === "user"
                            ? "bg-pjoxante-green text-white"
                            : "bg-pjoxante-green-light text-pjoxante-green"
                        )}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-pjoxante-green-light text-pjoxante-green rounded-lg p-3 text-sm">
                        Escribiendo...
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Pregúntanos sobre nuestros programas..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <PjoxanteButton
                    onClick={handleSendMessage}
                    size="icon"
                    disabled={!inputMessage.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </PjoxanteButton>
                </div>
                
                <div className="px-4 pb-4">
                  <p className="text-xs text-gray-500 text-center">
                    Mientras tanto, puedes explorar más sobre nuestros programas↓
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionContainer>
    )
  }
)
HeroSection.displayName = "HeroSection"

export { HeroSection }