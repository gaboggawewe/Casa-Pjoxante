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
          variant="donation"
          size="donation"
          onClick={handleClick}
          className={cn(
            "donation-button font-medium text-sm flex items-center gap-2 animate-pulse",
            className
          )}
        >
          <Heart className="h-4 w-4 fill-current" />
          Donar a Casa Pjoxante
        </PjoxanteButton>
      </div>
    )
  }
)
DonationButton.displayName = "DonationButton"

export { DonationButton }