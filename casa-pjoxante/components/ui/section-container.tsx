import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
}

const SectionContainer = React.forwardRef<HTMLElement, SectionContainerProps>(
  ({ className, as = "section", maxWidth = "xl", padding = "lg", children, ...props }, ref) => {
    const Component = as

    const maxWidthClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl", 
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      "2xl": "max-w-8xl",
      full: "max-w-full"
    }

    const paddingClasses = {
      none: "",
      sm: "py-6 px-4",
      md: "py-8 px-6",
      lg: "py-12 px-6 lg:px-8",
      xl: "py-16 px-6 lg:px-8"
    }

    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full",
          maxWidthClasses[maxWidth],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
SectionContainer.displayName = "SectionContainer"

export { SectionContainer }