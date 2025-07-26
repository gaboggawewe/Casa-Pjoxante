"use client"

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PjoxanteButton } from './pjoxante-button'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
}

interface ChatInterfaceProps {
  className?: string
}

export function ChatInterface({ className }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hola, ¿cómo estás?',
      sender: 'assistant'
    },
    {
      id: '2', 
      text: '¡Bien, gracias por preguntar! ¿En qué puedo ayudarte hoy?',
      sender: 'user'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isLoading) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user'
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Gracias por tu mensaje. ¿Cómo puedo ayudarte con nuestros programas?',
        sender: 'assistant'
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={cn(
      "rounded-lg p-6 flex flex-col w-96 h-[500px] shadow-xl border-2 border-[#3E8D35]/50 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300",
      className
    )}>
      {/* Header */}
      <div className="flex items-center pb-4 border-b-2 border-[#3E8D35]/30">
        <div className="w-14 h-14 rounded-full bg-[#3E8D35] mr-6 flex items-center justify-center p-2">
          <Image
            src="/LogosCasaPjoxante/logo-arbol-blanco-sencillo.png"
            alt="Casa Pjoxante Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="text-[#3E8D35] font-medium text-xl font-century">
          Chat
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto py-6 min-h-0">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "p-3 rounded-lg text-base max-w-[85%]",
                message.sender === 'assistant'
                  ? "bg-[#C1DCAB] text-[#3E8D35]"
                  : "bg-[#3E8D35]/95 text-white ml-auto"
              )}
            >
              <p>{message.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="p-3 rounded-lg text-base max-w-[85%] bg-[#C1DCAB]/50 text-[#3E8D35]">
              Escribiendo...
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="pt-4 border-t-2 border-[#3E8D35]/30">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje aquí"
            className="w-full p-3 border-none rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3E8D35] text-base"
            rows={2}
            disabled={isLoading}
          />
          <PjoxanteButton
            type="submit"
            variant="primary"
            size="default"
            disabled={!inputMessage.trim() || isLoading}
            className="mt-3 ml-3 bg-[#3E8D35] hover:bg-[#C1DCAB] hover:text-[#3E8D35] transition-colors text-base"
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </PjoxanteButton>
        </form>
      </div>
    </div>
  )
}