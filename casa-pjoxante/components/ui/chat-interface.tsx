"use client"

import React, { useState, useEffect, useRef } from 'react'
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
      text: 'Soy Pjoxantito, el asistente de Casa Pjoxante, puedes preguntarme lo que quieras sobre nosotros. ¡Estoy aquí para ayudarte!',
      sender: 'assistant'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user'
    }

    const messageToSend = inputMessage
    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error en la respuesta del servidor')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.respuesta,
        sender: 'assistant'
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error enviando mensaje:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un problema al procesar tu mensaje. Por favor intenta nuevamente.',
        sender: 'assistant'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={cn(
      "rounded-lg p-6 flex flex-col w-full h-[550px] shadow-xl border-2 border-[#3E8D35]/50 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300",
      className
    )}>
      {/* Header */}
      <div className="flex items-center pb-1 border-b-2 border-[#3E8D35]/30">
        <div className="w-14 h-14 rounded-full bg-[#3E8D35] mr-6 flex items-center justify-center p-2">
          <Image
            src="/LogosCasaPjoxante/logo-arbol-blanco-sencillo.png"
            alt="Casa Pjoxante Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="text-[#3E8D35] font-bold text-xl font-century">
        ¡Hola! ¿En que puedo ayudarte? ☺️
        </div>
      </div>

      {/* Messages Container */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto py-2 min-h-0 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
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
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="pt-1 border-t-2 border-[#3E8D35]/30">
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
            variant="outline"
            size="lg"
            disabled={!inputMessage.trim() || isLoading}
            className="mt-3 ml-3 inline-flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Enviar
          </PjoxanteButton>
        </form>
      </div>
    </div>
  )
}