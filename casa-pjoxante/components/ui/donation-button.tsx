"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { PjoxanteButton } from "./pjoxante-button"

interface DonationButtonProps {
  className?: string
  onClick?: () => void
  href?: string
}

const DonationButton = React.forwardRef<HTMLButtonElement, DonationButtonProps>(
  ({ className, onClick, href }, ref) => {
    const handleClick = () => {
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else if (onClick) {
        onClick()
      }
    }

    return (
      <div className="fixed bottom-5 right-5 z-50">
        <PjoxanteButton
          ref={ref}
          variant="outline"
          size="lg"
          onClick={handleClick}
          className={cn(
            "group font-medium text-sm flex items-center justify-center gap-2 rounded-full transition-all duration-1000 ease-in-out overflow-hidden w-12 h-12 p-3 hover:w-56 hover:px-6 hover:justify-start hover:bg-transparent hover:text-[#3E8D35]",
            className
          )}
        >
          <Heart className="!w-5 !h-5 flex-shrink-0" style={{ color: '#3E8D35', fill: '#3E8D35', stroke: '#3E8D35' }} />
          <span className="whitespace-nowrap hidden group-hover:inline-block">
            Donar a Casa Pjoxante
          </span>
        </PjoxanteButton>
      </div>
    )
  }
)
DonationButton.displayName = "DonationButton"

export { DonationButton }