import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Book, Heart, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { IslamicCard, IslamicCardContent, IslamicCardDescription, IslamicCardHeader, IslamicCardTitle } from "@/components/ui/islamic-card";
import { SURAHS } from "@/services/quranApi";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const featuredSurahs = SURAHS.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg gradient-islamic flex items-center justify-center">
              <Book className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Tafseer</h1>
              <p className="text-xs text-muted-foreground">Understand the Qur'an Better</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button asChild>
              <Link to="/surah">Browse Surahs</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent gradient-islamic">
            تفسير القرآن الكريم
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover the profound meanings and wisdom of the Holy Qur'an through authentic Tafseer
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <SearchInput
              placeholder="Search for Surah, Ayah, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-lg h-14"
            />
            <Button className="mt-4 px-8 py-3 text-lg" asChild>
              <Link to={`/search?q=${encodeURIComponent(searchQuery)}`}>
                Search Tafseer
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">114</div>
              <div className="text-sm text-muted-foreground">Surahs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">6,236</div>
              <div className="text-sm text-muted-foreground">Ayahs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Wisdom</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Surahs */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Sacred Texts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Begin your journey with these foundational chapters of the Qur'an
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSurahs.map((surah) => (
              <IslamicCard key={surah.number} className="hover:scale-105 transition-transform cursor-pointer">
                <IslamicCardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-12 h-12 rounded-full gradient-islamic flex items-center justify-center text-white font-bold">
                      {surah.number}
                    </div>
                    <Heart className="h-5 w-5 text-muted-foreground hover:text-red-500 cursor-pointer" />
                  </div>
                  <IslamicCardTitle className="arabic-text text-right">
                    {surah.name}
                  </IslamicCardTitle>
                  <IslamicCardDescription>
                    {surah.englishName} - {surah.englishNameTranslation}
                  </IslamicCardDescription>
                </IslamicCardHeader>
                <IslamicCardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{surah.numberOfAyahs} Ayahs</span>
                    <span>{surah.revelationType}</span>
                  </div>
                  <Button asChild className="w-full mt-4">
                    <Link to={`/surah/${surah.number}`}>
                      Read Tafseer
                    </Link>
                  </Button>
                </IslamicCardContent>
              </IslamicCard>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/surah">
                View All 114 Surahs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-islamic flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Tafseer</h3>
              <p className="text-muted-foreground">
                Access classical and contemporary interpretations from renowned scholars
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-islamic flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-muted-foreground">
                Find verses and explanations quickly with our intelligent search system
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-islamic flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Library</h3>
              <p className="text-muted-foreground">
                Save and organize your favorite verses and interpretations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Tafseer. Built with reverence and dedication to Islamic knowledge.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
