import * as React from "react"
import { cn } from "@/lib/utils"

const IslamicCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-lg relative overflow-hidden",
      "transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-islamic-primary/20",
      "hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-islamic-gold/5 before:to-transparent before:pointer-events-none",
      "before:transition-opacity before:duration-500 hover:before:from-islamic-gold/10",
      "after:absolute after:top-0 after:right-0 after:w-32 after:h-32 after:bg-islamic-pattern after:opacity-5 after:pointer-events-none",
      "after:transition-all after:duration-700 hover:after:opacity-10 hover:after:scale-110 hover:after:rotate-12",
      "border-slate-200 dark:border-islamic-green/20 hover:border-islamic-primary/30",
      "dark:hover:border-islamic-gold/40 dark:shadow-islamic-midnight/50",
      "dark:hover:shadow-2xl dark:hover:shadow-islamic-gold/10",
      "dark:before:from-islamic-emerald/8 dark:hover:before:from-islamic-gold/15",
      "backdrop-blur-sm dark:bg-islamic-midnight/80",
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
    className={cn(
      "flex flex-col space-y-1.5 p-6 relative",
      "before:absolute before:bottom-0 before:left-6 before:right-6 before:h-px",
      "before:bg-gradient-to-r before:from-transparent before:via-islamic-gold/30 before:to-transparent",
      "before:transition-all before:duration-500 group-hover:before:via-islamic-gold/60",
      "dark:before:via-islamic-emerald/40 dark:group-hover:before:via-islamic-gold/80",
      "after:absolute after:top-2 after:right-2 after:w-2 after:h-2 after:rounded-full",
      "after:bg-islamic-gold/20 after:animate-twinkle after:pointer-events-none",
      "dark:after:bg-islamic-emerald/30",
      className
    )} 
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
    className={cn(
      "font-semibold leading-none tracking-tight",
      "transition-colors duration-300 group-hover:text-islamic-primary",
      "text-slate-900 dark:text-islamic-pearl",
      "dark:group-hover:text-islamic-gold group-hover:drop-shadow-sm",
      "relative z-10",
      className
    )}
    {...props}
  />
))
IslamicCardTitle.displayName = "IslamicCardTitle"

const IslamicCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "text-sm text-muted-foreground",
      "transition-colors duration-300 group-hover:text-slate-600",
      "dark:text-islamic-pearl/70 dark:group-hover:text-islamic-emerald/90",
      "relative z-10",
      className
    )} 
    {...props} 
  />
))
IslamicCardDescription.displayName = "IslamicCardDescription"

const IslamicCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "p-6 pt-0 transition-all duration-300",
      "group-hover:translate-y-0.5",
      className
    )} 
    {...props} 
  />
))
IslamicCardContent.displayName = "IslamicCardContent"

const IslamicCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "flex items-center p-6 pt-0 relative",
      "before:absolute before:top-0 before:left-6 before:right-6 before:h-px",
      "before:bg-gradient-to-r before:from-transparent before:via-slate-200 before:to-transparent",
      "dark:before:via-islamic-green/30 group-hover:before:via-islamic-gold/40",
      "dark:group-hover:before:via-islamic-emerald/60",
      "before:transition-all before:duration-500",
      "after:absolute after:bottom-2 after:left-2 after:w-1 after:h-1 after:rounded-full",
      "after:bg-islamic-emerald/30 after:animate-breathe after:pointer-events-none",
      "dark:after:bg-islamic-gold/40",
      className
    )} 
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