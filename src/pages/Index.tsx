import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Book, Heart, Moon, Sun, Star, Bookmark, Users, Compass, Shield, Lightbulb, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { IslamicCard, IslamicCardContent, IslamicCardDescription, IslamicCardHeader, IslamicCardTitle } from "@/components/ui/islamic-card";
import { SURAHS } from "@/data/surahs";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const featuredSurahs = SURAHS.slice(0, 6);

  return (
    <div className="min-h-screen bg-background calligraphy-pattern">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4 group">
            <div className="w-12 h-12 rounded-xl gradient-islamic flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
              <Book className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">تفسير إقرأ</h1>
              <p className="text-sm text-muted-foreground font-medium">Understand the Qur'an with Wisdom</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-primary/10 transition-all duration-300"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-600" />}
            </Button>
            <Button asChild className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg">
              <Link to="/surah">Browse Surahs</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 dark:from-emerald-950/20 dark:via-slate-900 dark:to-amber-950/20 arabesque-pattern">
        <div className="absolute inset-0 islamic-pattern opacity-[0.03]"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating Islamic Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg opacity-20">
            <Moon className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-float" style={{animationDelay: '1s'}}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center shadow-lg opacity-20">
            <Star className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center shadow-lg opacity-20">
            <Compass className="w-7 h-7 text-white" />
          </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Authentic Islamic Knowledge
            </div>
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 flex items-center justify-center shadow-2xl animate-pulse">
              <Book className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="mb-8 flex justify-center">
            <img 
              src="/tafseer-title.svg" 
              alt="تفسير القرآن الكريم" 
              className="h-16 md:h-20 lg:h-24 w-auto max-w-full object-contain"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
            />
          </div>
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 mt-16 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Discover the profound meanings and timeless wisdom of the Holy Qur'an through
            <span className="font-semibold text-emerald-700 dark:text-emerald-400"> authentic Tafseer</span>
          </p>
          
          {/* Spiritual Indicators */}
          <div className="flex items-center justify-center space-x-8 mt-8 animate-slideUp" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Authentic Sources</span>
            </div>
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <Lightbulb className="w-5 h-5" />
              <span className="text-sm font-medium">Deep Insights</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">Multiple Languages</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative group">
              <SearchInput
                placeholder="Search for Surah, Ayah, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-lg h-16 pl-6 pr-16 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 focus:border-emerald-400 dark:focus:border-emerald-600 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
            <Button className="mt-6 px-10 py-4 text-lg rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-xl transform hover:scale-105 transition-all duration-300" asChild>
              <Link to={`/search?q=${encodeURIComponent(searchQuery)}`}>
                <Search className="w-5 h-5 mr-2" />
                Search Tafseer
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
                <span className="text-2xl md:text-3xl font-bold text-white">114</span>
              </div>
              <div className="text-base md:text-lg font-semibold text-slate-700 dark:text-slate-300">Surahs</div>
              <div className="text-sm text-muted-foreground">Complete Chapters</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
                <span className="text-xl md:text-2xl font-bold text-white">6,236</span>
              </div>
              <div className="text-base md:text-lg font-semibold text-slate-700 dark:text-slate-300">Ayahs</div>
              <div className="text-sm text-muted-foreground">Sacred Verses</div>
            </div>
            <div className="text-center group sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
                <span className="text-2xl md:text-3xl font-bold text-white">∞</span>
              </div>
              <div className="text-base md:text-lg font-semibold text-slate-700 dark:text-slate-300">Wisdom</div>
              <div className="text-sm text-muted-foreground">Eternal Guidance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Surahs */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50/50 to-emerald-50/30 dark:from-slate-900/50 dark:to-emerald-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4 md:mb-6">
              <Bookmark className="w-4 h-4 mr-2" />
              Featured Collection
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent">Explore Sacred Texts</h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              Begin your spiritual journey with these foundational chapters of the Holy Qur'an, each containing profound wisdom and guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {featuredSurahs.map((surah, index) => (
              <IslamicCard key={surah.number} className="group hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <IslamicCardHeader className="relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                        {surah.number}
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-amber-400 rounded-full flex items-center justify-center">
                        <Star className="w-2 h-2 md:w-3 md:h-3 text-white" />
                      </div>
                    </div>
                    <Heart className="h-5 w-5 md:h-6 md:w-6 text-slate-400 hover:text-red-500 hover:scale-110 cursor-pointer transition-all duration-300" />
                  </div>
                  <IslamicCardTitle className="surah-name text-right text-xl md:text-2xl mb-3 text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {surah.name}
                  </IslamicCardTitle>
                  <IslamicCardDescription className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300">
                    {surah.englishName}
                  </IslamicCardDescription>
                  <p className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                    {surah.englishNameTranslation}
                  </p>
                </IslamicCardHeader>
                <IslamicCardContent className="relative">
                  <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 mb-4 md:mb-6">
                    <div className="flex items-center space-x-1">
                      <Book className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-medium text-xs md:text-sm">{surah.numberOfAyahs} Ayahs</span>
                    </div>
                    <div className="px-2 md:px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                      {surah.revelationType}
                    </div>
                  </div>
                  <Button asChild className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300 text-sm md:text-base py-2 md:py-3">
                    <Link to={`/surah/${surah.number}`}>
                      <Book className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      Read Tafseer
                    </Link>
                  </Button>
                </IslamicCardContent>
              </IslamicCard>
            ))}
          </div>
          
          <div className="text-center mt-12 md:mt-16">
            <Button variant="outline" size="lg" className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg border-2 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300" asChild>
              <Link to="/surah">
                <Book className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                View All 114 Surahs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 relative overflow-hidden geometric-pattern">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-emerald-500 rounded-2xl transform rotate-12" />
          <div className="absolute top-20 right-20 w-24 h-24 border-2 border-amber-500 rounded-xl transform -rotate-12" />
          <div className="absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-500 rounded-lg transform rotate-45" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center shadow-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4 md:mb-6">
              <Star className="w-4 h-4 mr-2" />
              Core Features
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-amber-600 to-emerald-700 bg-clip-text text-transparent px-4">Why Choose Tafseer Iqra</h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              Experience the Qur'an like never before with our comprehensive suite of study tools and authentic scholarly interpretations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="relative mb-6 md:mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                  <Book className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-amber-400 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">Authentic Tafseer</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                Access classical and contemporary interpretations from renowned Islamic scholars, ensuring authenticity and depth in understanding
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-6 md:mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                  <Search className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-slate-800 dark:text-slate-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-300">Smart Search</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                Find verses, topics, and explanations instantly with our intelligent search system powered by advanced algorithms
              </p>
            </div>
            <div className="text-center group sm:col-span-2 lg:col-span-1">
              <div className="relative mb-6 md:mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                  <Heart className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-amber-400 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-slate-800 dark:text-slate-200 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors duration-300">Personal Library</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                Save, bookmark, and organize your favorite verses and interpretations to create your personal spiritual library
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-r from-emerald-900/5 to-amber-900/5 dark:from-emerald-950/20 dark:to-amber-950/20 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-islamic flex items-center justify-center shadow-lg">
                <Book className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">تفسير إقرأ</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-4 text-lg">
              Built with reverence and dedication to Islamic knowledge
            </p>
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <Users className="w-4 h-4" />
                <span>Community Driven</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <Heart className="w-4 h-4" />
                <span>Made with Love</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <Star className="w-4 h-4" />
                <span>Open Source</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2024 Tafseer Iqra. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
