import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Star, Clock, MapPin, Bookmark, Book, Moon, Sun, Compass, Shield, Heart, Zap, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { IslamicCard, IslamicCardContent, IslamicCardDescription, IslamicCardHeader, IslamicCardTitle } from '@/components/ui/islamic-card'
import { SearchInput } from '@/components/ui/search-input'
import { SearchResults, SearchResult } from '@/components/ui/search-results'
import { SURAHS } from '@/data/surahs'
import { SurahCardSkeleton } from '@/components/ui/skeleton'

const SurahListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const filteredSurahs = SURAHS.filter(surah =>
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.number.toString().includes(searchQuery)
  );

  const calculateRelevanceScore = (surah: any, query: string) => {
    const lowerQuery = query.toLowerCase();
    let score = 0;
    
    // Exact name match gets highest score
    if (surah.name.toLowerCase() === lowerQuery) score += 1.0;
    else if (surah.name.toLowerCase().includes(lowerQuery)) score += 0.8;
    
    // English name match
    if (surah.englishName.toLowerCase() === lowerQuery) score += 0.9;
    else if (surah.englishName.toLowerCase().includes(lowerQuery)) score += 0.7;
    
    // Number match
    if (surah.number.toString() === query) score += 0.6;
    
    return Math.min(score, 1.0);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
    if (value.length > 0) {
      const results = filteredSurahs.map(surah => ({
        id: surah.number.toString(),
        type: 'surah' as const,
        title: surah.name,
        subtitle: surah.englishName,
        content: `${surah.englishName} - ${surah.numberOfAyahs} verses, revealed in ${surah.revelationType}`,
        surahNumber: surah.number,
        revelationType: surah.revelationType as 'Meccan' | 'Medinan',
        relevanceScore: calculateRelevanceScore(surah, value)
      }));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (result: SearchResult) => {
    // Navigate to the specific surah
    window.location.href = `/surah/${result.surahNumber}`;
  };

  useEffect(() => {
    // Simulate loading and trigger animations
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setAnimateCards(true), 100);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden star-pattern geometric-pattern islamic-pattern calligraphy-pattern arabesque-pattern">
      {/* Background Patterns */}
      <div className="absolute inset-0 star-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 geometric-pattern opacity-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 islamic-pattern opacity-25" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 animate-float opacity-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center">
          <Moon className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="absolute bottom-32 right-32 animate-float opacity-10" style={{animationDelay: '2s'}}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
          <Star className="w-10 h-10 text-white" />
        </div>
      </div>
      <div className="absolute top-1/2 left-10 animate-float opacity-10" style={{animationDelay: '4s'}}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
          <Compass className="w-8 h-8 text-white" />
        </div>
      </div>
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 hover:bg-card/70">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-islamic-primary/10 transition-colors" asChild>
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl gradient-islamic flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-breathe">
                  <Book className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-islamic-primary to-islamic-gold bg-clip-text text-transparent flex items-center">
                    All Surahs
                    <Shield className="w-4 h-4 ml-2 text-emerald-500 animate-twinkle" />
                  </h1>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Globe className="w-3 h-3 mr-1" />
                    114 Chapters of the Holy Qur'an
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-80">
                <SearchInput
                  placeholder="Search surahs by name, number, or translation..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="flex-1"
                  isLoading={isLoading}
                  showSuggestions={searchQuery.length > 0 && filteredSurahs.length > 0}
                />
              </div>
              <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-2 hover:bg-islamic-primary/5">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Favorites</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {showSearchResults ? (
          /* Search Results View */
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Search Results
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} matching your search
              </p>
            </div>
            
            <SearchResults
              results={searchResults}
              isLoading={false}
              query={searchQuery}
              onResultClick={handleSearchResultClick}
              className="mb-8"
            />
            
            {searchResults.length > 0 && (
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                    setSearchResults([]);
                  }}
                  className="bg-gradient-to-r from-emerald-50 to-amber-50 hover:from-emerald-100 hover:to-amber-100 dark:from-emerald-950 dark:to-amber-950 border-emerald-200 dark:border-emerald-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Surahs
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-islamic-primary to-islamic-gold flex items-center justify-center shadow-2xl animate-breathe">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 arabic-heading bg-gradient-to-r from-islamic-primary via-islamic-gold to-islamic-primary bg-clip-text text-transparent animate-fadeIn">
                  سور القرآن الكريم
                </h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed animate-slideUp">
                  Explore all 114 chapters of the Holy Qur'an with detailed Tafseer and authentic translations
                </p>
                
                {/* Spiritual Indicators */}
                <div className="flex items-center justify-center space-x-8 mb-6">
                  <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                    <Shield className="w-4 h-4 animate-twinkle" />
                    <span className="text-sm font-medium">Divine Protection</span>
                  </div>
                  <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
                    <Sun className="w-4 h-4 animate-twinkle" style={{animationDelay: '0.5s'}} />
                    <span className="text-sm font-medium">Eternal Light</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                    <Heart className="w-4 h-4 animate-twinkle" style={{animationDelay: '1s'}} />
                    <span className="text-sm font-medium">Spiritual Healing</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground animate-slideUp" style={{animationDelay: '0.2s'}}>
                  <div className="flex items-center space-x-2">
                    <Book className="w-4 h-4 text-islamic-primary" />
                    <span>Showing {filteredSurahs.length} of {SURAHS.length} surahs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-islamic-gold" />
                    <span>Authentic Sources</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 animate-scaleIn hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{SURAHS.filter(s => s.revelationType === 'Meccan').length}</div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">Meccan</div>
                  <div className="mt-1 text-xs text-emerald-500 dark:text-emerald-500 flex items-center justify-center">
                    <Moon className="w-3 h-3 mr-1" />
                    <span>Early</span>
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 animate-scaleIn hover:shadow-xl transition-all duration-300 group" style={{animationDelay: '0.1s'}}>
                  <div className="flex items-center justify-center mb-2">
                    <Compass className="w-5 h-5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{SURAHS.filter(s => s.revelationType === 'Medinan').length}</div>
                  <div className="text-sm text-amber-600 dark:text-amber-400">Medinan</div>
                  <div className="mt-1 text-xs text-amber-500 dark:text-amber-500 flex items-center justify-center">
                    <Sun className="w-3 h-3 mr-1" />
                    <span>Later</span>
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 animate-scaleIn hover:shadow-xl transition-all duration-300 group" style={{animationDelay: '0.2s'}}>
                  <div className="flex items-center justify-center mb-2">
                    <Book className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{SURAHS.reduce((sum, s) => sum + s.numberOfAyahs, 0)}</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">Total Ayahs</div>
                  <div className="mt-1 text-xs text-blue-500 dark:text-blue-500 flex items-center justify-center">
                    <Zap className="w-3 h-3 mr-1" />
                    <span>Verses</span>
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 animate-scaleIn hover:shadow-xl transition-all duration-300 group" style={{animationDelay: '0.3s'}}>
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">114</div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">Chapters</div>
                  <div className="mt-1 text-xs text-purple-500 dark:text-purple-500 flex items-center justify-center">
                    <Heart className="w-3 h-3 mr-1" />
                    <span>Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Surah Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <SurahCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSurahs.map((surah, index) => (
              <IslamicCard 
                key={surah.number} 
                className={`transition-all duration-500 cursor-pointer group stagger-item ${
                  animateCards ? 'animate-slideUp' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Link to={`/surah/${surah.number}`} className="block h-full">
                  <IslamicCardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl gradient-islamic flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                          {surah.number}
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-islamic-gold/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                          <Star className="w-3 h-3 text-islamic-gold" />
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-105 ${
                          surah.revelationType === 'Meccan' 
                            ? 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 dark:from-amber-900 dark:to-amber-800 dark:text-amber-200 group-hover:from-amber-200 group-hover:to-amber-300' 
                            : 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 dark:from-emerald-900 dark:to-emerald-800 dark:text-emerald-200 group-hover:from-emerald-200 group-hover:to-emerald-300'
                        }`}>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{surah.revelationType}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <IslamicCardTitle className="surah-name text-right text-2xl mb-3 font-bold leading-tight group-hover:text-islamic-primary transition-colors duration-300">
                      {surah.name}
                    </IslamicCardTitle>
                    
                    <IslamicCardDescription className="space-y-1">
                      <div className="font-semibold text-base group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">{surah.englishName}</div>
                      <div className="text-sm text-islamic-primary/70 group-hover:text-islamic-primary transition-colors">{surah.englishNameTranslation}</div>
                    </IslamicCardDescription>
                  </IslamicCardHeader>
                  
                  <IslamicCardContent className="pt-0">
                    <div className="flex justify-between items-center text-sm mb-4">
                      <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                        <Book className="h-4 w-4" />
                        <span className="font-medium">{surah.numberOfAyahs} Ayahs</span>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <span className="text-islamic-primary font-medium">Read</span>
                        <ArrowLeft className="w-4 h-4 text-islamic-primary rotate-180" />
                      </div>
                    </div>
                    
                    {/* Progress bar placeholder */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-islamic-primary to-islamic-gold rounded-full transition-all duration-700 group-hover:w-full" style={{ width: '0%' }}></div>
                    </div>
                  </IslamicCardContent>
                </Link>
              </IslamicCard>
            ))}
          </div>
        )}

        {filteredSurahs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No surahs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search query to find what you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SurahListPage;