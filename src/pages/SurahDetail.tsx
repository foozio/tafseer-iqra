import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { quranApi } from '@/services/quranApi';
import { SURAHS } from '@/data/surahs';

interface Ayah {
  number: number;
  text: string;
  translation?: string;
  tafseer?: string;
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

const SurahDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const surahNumber = parseInt(id || '1', 10);
  const surahInfo = SURAHS.find(s => s.number === surahNumber);

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch surah data from API
        const response = await quranApi.getSurah(surahNumber);
        
        if (response && response.data) {
          setSurahData(response.data);
        } else {
          throw new Error('Surah data not found');
        }
      } catch (err) {
        console.error('Error fetching surah:', err);
        setError('Failed to load surah data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (surahNumber >= 1 && surahNumber <= 114) {
      fetchSurahData();
    } else {
      setError('Invalid surah number');
      setLoading(false);
    }
  }, [surahNumber]);

  const handleBackToList = () => {
    navigate('/surah');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-10 w-32 mb-4" />
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-6 w-48" />
          </div>
          
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={handleBackToList}
            variant="ghost" 
            className="mb-6 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Surah List
          </Button>
          
          <Card className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <BookOpen className="h-12 w-12 mx-auto mb-4" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Error Loading Surah</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-emerald-600 hover:bg-emerald-700">
              Try Again
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!surahData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={handleBackToList}
            variant="ghost" 
            className="mb-6 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Surah List
          </Button>
          
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Surah Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400">The requested surah could not be found.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="mb-8">
          <Button 
            onClick={handleBackToList}
            variant="ghost" 
            className="mb-6 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Surah List
          </Button>
          
          {/* Surah Header */}
          <Card className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {surahInfo?.name || surahData.name}
                </h1>
                <h2 className="text-xl mb-2">
                  {surahData.englishName} - {surahData.englishNameTranslation}
                </h2>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Surah {surahData.number}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {surahData.numberOfAyahs} Ayahs
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {surahData.revelationType}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <Star className="h-8 w-8 mb-2" />
                <p className="text-sm opacity-90">Surah #{surahData.number}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Ayahs */}
        <div className="space-y-6">
          {surahData.ayahs && surahData.ayahs.length > 0 ? (
            surahData.ayahs.map((ayah, index) => (
              <Card key={ayah.number || index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                      Ayah {ayah.number || index + 1}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {surahData.number}:{ayah.number || index + 1}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Arabic Text */}
                  <div className="text-right">
                    <p className="text-2xl leading-loose font-arabic text-slate-800 dark:text-slate-200 mb-4" dir="rtl">
                      {ayah.text}
                    </p>
                  </div>
                  
                  {/* Translation */}
                  {ayah.translation && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Translation:</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {ayah.translation}
                      </p>
                    </div>
                  )}
                  
                  {/* Tafseer */}
                  {ayah.tafseer && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Tafseer:</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        {ayah.tafseer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No Ayahs Available</h3>
              <p className="text-gray-600 dark:text-gray-400">
                The ayahs for this surah are not currently available.
              </p>
            </Card>
          )}
        </div>
        
        {/* Footer Navigation */}
        <div className="mt-12 flex justify-center">
          <Button 
            onClick={handleBackToList}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Surah List
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurahDetail;