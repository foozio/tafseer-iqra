import * as React from "react"
import { Search, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  showSuggestions?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, isLoading = false, showSuggestions = false, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className="relative group">
        {/* Background glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/20 to-amber-500/20 blur-xl transition-all duration-500 opacity-0",
          isFocused && "opacity-100 scale-105"
        )} />
        
        {/* Main input container */}
        <div className={cn(
          "relative bg-white dark:bg-slate-800 rounded-lg border-2 transition-all duration-300 shadow-lg",
          isFocused 
            ? "border-emerald-400 dark:border-emerald-500 shadow-emerald-200/50 dark:shadow-emerald-900/50" 
            : "border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600",
          hasValue && "border-amber-400 dark:border-amber-500"
        )}>
          {/* Search icon with animation */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300">
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-emerald-500 animate-spin" />
            ) : (
              <Search className={cn(
                "h-5 w-5 transition-all duration-300",
                isFocused 
                  ? "text-emerald-500 scale-110" 
                  : "text-slate-400 dark:text-slate-500 group-hover:text-emerald-400"
              )} />
            )}
          </div>

          {/* Input field */}
          <input
            className={cn(
              "flex h-14 w-full rounded-lg bg-transparent pl-12 pr-4 py-3 text-base font-medium transition-all duration-300",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "text-slate-800 dark:text-slate-200",
              className
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {/* Animated border */}
          <div className={cn(
            "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-500 ease-out",
            isFocused ? "w-full" : "w-0"
          )} />
        </div>

        {/* Suggestions indicator */}
        {showSuggestions && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }