import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const pjoxanteButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-century",
  {
    variants: {
      variant: {
        primary: "bg-pjoxante-green hover:bg-pjoxante-green/90 text-white",
        secondary: "bg-pjoxante-brown-light hover:bg-pjoxante-brown-medium text-white",
        outline: "border border-pjoxante-green text-pjoxante-green hover:bg-pjoxante-green hover:text-white",
        ghost: "hover:bg-pjoxante-green-light hover:text-pjoxante-green",
        link: "text-pjoxante-green underline-offset-4 hover:underline",
        donation: "bg-pjoxante-green hover:bg-pjoxante-green-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        donation: "h-12 px-6 py-3 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface PjoxanteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pjoxanteButtonVariants> {
  asChild?: boolean
}

const PjoxanteButton = React.forwardRef<HTMLButtonElement, PjoxanteButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(pjoxanteButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
PjoxanteButton.displayName = "PjoxanteButton"

export { PjoxanteButton, pjoxanteButtonVariants }