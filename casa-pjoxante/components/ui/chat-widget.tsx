"use client"

import * as React from "react"
import { useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { PjoxanteButton } from "./pjoxante-button"
import { Input } from "./input"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatWidgetProps {
  className?: string
  title?: string
  placeholder?: string
  onSendMessage?: (message: string) => Promise<string>
}

const ChatWidget = React.forwardRef<HTMLDivElement, ChatWidgetProps>(
  ({ className, title = "Chat con Casa Pjoxante", placeholder = "Escribe tu mensaje...", onSendMessage }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
      {
        id: "1",
        text: "¡Hola! Bienvenido a Casa Pjoxante. ¿En qué puedo ayudarte hoy?",
        sender: "bot",
        timestamp: new Date()
      }
    ])
    const [inputMessage, setInputMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSendMessage = async () => {
      if (!inputMessage.trim()) return

      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage])
      setInputMessage("")
      setIsLoading(true)

      try {
        let botResponse = "Gracias por tu mensaje. Un miembro de nuestro equipo se pondrá en contacto contigo pronto."
        
        if (onSendMessage) {
          botResponse = await onSendMessage(inputMessage)
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date()
        }

        setMessages(prev => [...prev, botMessage])
      } catch (error) {
        console.error("Error sending message:", error)
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
      <div ref={ref} className={cn("fixed bottom-20 right-4 z-50", className)}>
        {/* Chat Toggle Button */}
        {!isOpen && (
          <PjoxanteButton
            variant="primary"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="h-6 w-6" />
          </PjoxanteButton>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="bg-white rounded-lg shadow-xl border w-80 h-96 flex flex-col">
            {/* Header */}
            <div className="bg-pjoxante-green text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-medium text-sm">{title}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-pjoxante-green-dark rounded p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
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
                      "max-w-[80%] rounded-lg p-3 text-sm",
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
                placeholder={placeholder}
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
          </div>
        )}
      </div>
    )
  }
)
ChatWidget.displayName = "ChatWidget"

export { ChatWidget }