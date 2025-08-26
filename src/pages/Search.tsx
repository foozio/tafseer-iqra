import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Book, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { IslamicCard, IslamicCardContent, IslamicCardDescription, IslamicCardHeader, IslamicCardTitle } from "@/components/ui/islamic-card";
import { SURAHS } from "@/data/surahs";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof SURAHS>([]);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const results = SURAHS.filter(surah => 
      surah.name.includes(query) ||
      surah.englishName.toLowerCase().includes(query.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(query.toLowerCase()) ||
      surah.number.toString().includes(query)
    );
    
    setSearchResults(results);
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      performSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/10">
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl gradient-islamic flex items-center justify-center shadow-lg">
                <Search className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">Search Tafseer</h1>
                <p className="text-sm text-muted-foreground">Find Surahs and verses</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-12 bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 dark:from-emerald-950/20 dark:via-slate-900 dark:to-amber-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent">
              Search the Holy Qur'an
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Search for Surahs by name, number, or meaning
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative group">
                <SearchInput
                  placeholder="Search for Surah name, number, or meaning..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg h-14 pl-6 pr-16 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 focus:border-emerald-400 dark:focus:border-emerald-600 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-all duration-300"
                />
                <Button 
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {searchQuery && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Search Results for "{searchQuery}"
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {isLoading ? 'Searching...' : `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl h-48"></div>
                </div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((surah) => (
                <IslamicCard key={surah.number} className="group hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <IslamicCardHeader className="relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                        {surah.number}
                      </div>
                    </div>
                    <IslamicCardTitle className="surah-name text-right text-2xl mb-3 text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {surah.name}
                    </IslamicCardTitle>
                    <IslamicCardDescription className="text-base font-medium text-slate-600 dark:text-slate-300">
                      {surah.englishName}
                    </IslamicCardDescription>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                      {surah.englishNameTranslation}
                    </p>
                  </IslamicCardHeader>
                  <IslamicCardContent className="relative">
                    <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
                      <div className="flex items-center space-x-1">
                        <Book className="w-4 h-4" />
                        <span className="font-medium">{surah.numberOfAyahs} Ayahs</span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                        {surah.revelationType}
                      </div>
                    </div>
                    <Button asChild className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
                      <Link to={`/surah/${surah.number}`}>
                        <Book className="w-4 h-4 mr-2" />
                        Read Tafseer
                      </Link>
                    </Button>
                  </IslamicCardContent>
                </IslamicCard>
              ))}
            </div>
          ) : searchQuery && !isLoading ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                No results found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Try searching with different keywords or check your spelling
              </p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-200 to-amber-200 dark:from-emerald-800 dark:to-amber-800 flex items-center justify-center">
                <Search className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Start your search
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Enter a Surah name, number, or meaning to begin searching
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;