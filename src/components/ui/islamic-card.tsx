import * as React from "react"
import { cn } from "@/lib/utils"

const IslamicCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden",
      "before:absolute before:inset-0 before:islamic-pattern before:pointer-events-none",
      className
    )}
    {...props}
  />
))
IslamicCard.displayName = "IslamicCard"

const IslamicCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 relative z-10", className)}
    {...props}
  />
))
IslamicCardHeader.displayName = "IslamicCardHeader"

const IslamicCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
IslamicCardTitle.displayName = "IslamicCardTitle"

const IslamicCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
IslamicCardDescription.displayName = "IslamicCardDescription"

const IslamicCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0 relative z-10", className)} {...props} />
))
IslamicCardContent.displayName = "IslamicCardContent"

const IslamicCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 relative z-10", className)}
    {...props}
  />
))
IslamicCardFooter.displayName = "IslamicCardFooter"

export {
  IslamicCard,
  IslamicCardHeader,
  IslamicCardFooter,
  IslamicCardTitle,
  IslamicCardDescription,
  IslamicCardContent,
}