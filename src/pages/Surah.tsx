import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Book, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { IslamicCard, IslamicCardContent, IslamicCardDescription, IslamicCardHeader, IslamicCardTitle } from "@/components/ui/islamic-card";
import { SURAHS } from "@/services/quranApi";

const SurahListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = SURAHS.filter(surah =>
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.number.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg gradient-islamic flex items-center justify-center">
                  <Book className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold">All Surahs</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-80">
                <SearchInput
                  placeholder="Search surahs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">سور القرآن الكريم</h1>
          <p className="text-muted-foreground">
            Explore all 114 chapters of the Holy Qur'an with detailed Tafseer
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredSurahs.length} of {SURAHS.length} surahs
          </div>
        </div>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSurahs.map((surah) => (
            <IslamicCard 
              key={surah.number} 
              className="hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <Link to={`/surah/${surah.number}`}>
                <IslamicCardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-12 h-12 rounded-full gradient-islamic flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                      {surah.number}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      surah.revelationType === 'Meccan' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' 
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    }`}>
                      {surah.revelationType}
                    </div>
                  </div>
                  
                  <IslamicCardTitle className="arabic-text text-right text-xl mb-2 group-hover:text-primary transition-colors">
                    {surah.name}
                  </IslamicCardTitle>
                  
                  <IslamicCardDescription className="mb-1">
                    <div className="font-medium">{surah.englishName}</div>
                    <div className="text-xs">{surah.englishNameTranslation}</div>
                  </IslamicCardDescription>
                </IslamicCardHeader>
                
                <IslamicCardContent className="pt-0">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Search className="h-3 w-3" />
                      <span>{surah.numberOfAyahs} Ayahs</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-primary">Read →</span>
                    </div>
                  </div>
                </IslamicCardContent>
              </Link>
            </IslamicCard>
          ))}
        </div>

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