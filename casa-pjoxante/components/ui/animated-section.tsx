"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function AnimatedSection({ 
  children, 
  className, 
  delay = 0,
  direction = 'up'
}: AnimatedSectionProps) {
  const getInitialState = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 30 }
      case 'down': return { opacity: 0, y: -30 }
      case 'left': return { opacity: 0, x: -30 }
      case 'right': return { opacity: 0, x: 30 }
      default: return { opacity: 0, y: 30 }
    }
  }

  const getAnimateState = () => {
    switch (direction) {
      case 'up':
      case 'down': return { opacity: 1, y: 0 }
      case 'left':
      case 'right': return { opacity: 1, x: 0 }
      default: return { opacity: 1, y: 0 }
    }
  }

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={getInitialState()}
        whileInView={getAnimateState()}
        viewport={{ margin: "-15% 0px", amount: 0.1 }}
        transition={{ 
          duration: 1, 
          delay,
          ease: [0.4, 0, 0.2, 1] 
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}