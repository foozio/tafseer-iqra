import * as React from "react"
import { Search, Book, MapPin, Clock, Star, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { IslamicCard, IslamicCardContent, IslamicCardDescription, IslamicCardHeader, IslamicCardTitle } from "./islamic-card"
import { Button } from "./button"

export interface SearchResult {
  id: string;
  type: 'surah' | 'ayah' | 'topic';
  title: string;
  subtitle?: string;
  content: string;
  surahNumber?: number;
  ayahNumber?: number;
  revelationType?: 'Meccan' | 'Medinan';
  relevanceScore?: number;
}

export interface SearchResultsProps {
  results: SearchResult[];
  isLoading?: boolean;
  query?: string;
  onResultClick?: (result: SearchResult) => void;
  className?: string;
}

const SearchResults = React.forwardRef<HTMLDivElement, SearchResultsProps>(
  ({ results, isLoading = false, query = "", onResultClick, className, ...props }, ref) => {
    const [animateResults, setAnimateResults] = React.useState(false);

    React.useEffect(() => {
      if (results.length > 0) {
        setAnimateResults(true);
        const timer = setTimeout(() => setAnimateResults(false), 100);
        return () => clearTimeout(timer);
      }
    }, [results]);

    const highlightText = (text: string, query: string) => {
      if (!query.trim()) return text;
      
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      
      return parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="bg-gradient-to-r from-emerald-200 to-amber-200 dark:from-emerald-800 dark:to-amber-800 text-emerald-900 dark:text-emerald-100 px-1 rounded font-semibold">
            {part}
          </mark>
        ) : part
      );
    };

    const getResultIcon = (type: SearchResult['type']) => {
      switch (type) {
        case 'surah':
          return <Book className="h-5 w-5" />;
        case 'ayah':
          return <Star className="h-5 w-5" />;
        case 'topic':
          return <Search className="h-5 w-5" />;
        default:
          return <Book className="h-5 w-5" />;
      }
    };

    const getResultGradient = (type: SearchResult['type']) => {
      switch (type) {
        case 'surah':
          return 'from-emerald-500 to-emerald-600';
        case 'ayah':
          return 'from-amber-500 to-amber-600';
        case 'topic':
          return 'from-blue-500 to-blue-600';
        default:
          return 'from-slate-500 to-slate-600';
      }
    };

    if (isLoading) {
      return (
        <div className={cn("space-y-4", className)} ref={ref} {...props}>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <IslamicCard className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                  </div>
                </div>
              </IslamicCard>
            </div>
          ))}
        </div>
      );
    }

    if (results.length === 0 && query) {
      return (
        <div className={cn("text-center py-12", className)} ref={ref} {...props}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
            <Search className="h-8 w-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
            No results found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            We couldn't find any matches for "{query}". Try different keywords or browse our Surah collection.
          </p>
          <Button variant="outline" className="mt-6">
            <Book className="w-4 h-4 mr-2" />
            Browse All Surahs
          </Button>
        </div>
      );
    }

    return (
      <div className={cn("space-y-4", className)} ref={ref} {...props}>
        {query && (
          <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-950 dark:to-amber-950 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 flex items-center justify-center">
                <Search className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for
                </p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  "{query}"
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {results.length} / 6236 verses
            </div>
          </div>
        )}
        
        {results.map((result, index) => (
          <IslamicCard 
            key={result.id} 
            className={cn(
              "group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-500 animate-slideUp",
              animateResults && "animate-fadeIn"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onResultClick?.(result)}
          >
            <IslamicCardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110",
                  getResultGradient(result.type)
                )}>
                  {getResultIcon(result.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <IslamicCardTitle className="text-lg font-bold group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {highlightText(result.title, query)}
                    </IslamicCardTitle>
                    
                    {result.relevanceScore && (
                      <div className="flex items-center space-x-1 text-xs text-amber-600 dark:text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{Math.round(result.relevanceScore * 100)}%</span>
                      </div>
                    )}
                  </div>
                  
                  {result.subtitle && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {highlightText(result.subtitle, query)}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                    {result.surahNumber && (
                      <div className="flex items-center space-x-1">
                        <Book className="w-3 h-3" />
                        <span>Surah {result.surahNumber}</span>
                      </div>
                    )}
                    
                    {result.ayahNumber && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>Ayah {result.ayahNumber}</span>
                      </div>
                    )}
                    
                    {result.revelationType && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{result.revelationType}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
            </IslamicCardHeader>
            
            <IslamicCardContent>
              <IslamicCardDescription className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {highlightText(result.content, query)}
              </IslamicCardDescription>
            </IslamicCardContent>
          </IslamicCard>
        ))}
      </div>
    );
  }
);

SearchResults.displayName = "SearchResults";

export { SearchResults };