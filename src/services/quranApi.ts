import { TafseerResponse } from '@/types/quran';
import { SURAHS } from '@/data/surahs';
import { getTafseerSourceInfo } from '@/constants/tafseerSources';
import { getLocalTafseer } from '@/data/localTafseer';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

// Multiple tafseer API endpoints for fallback reliability
const TAFSEER_API_ENDPOINTS = [
  {
    name: 'spa5k CDN',
    baseUrl: 'https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir',
    format: (source: string, surah: number, ayah: number) => `${source}/${surah}/${ayah}.json`,
    priority: 1
  },
  {
    name: 'spa5k GitHub Raw',
    baseUrl: 'https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir',
    format: (source: string, surah: number, ayah: number) => `${source}/${surah}/${ayah}.json`,
    priority: 2
  },
  {
    name: 'Alternative CDN',
    baseUrl: 'https://unpkg.com/tafsir-api@latest/tafsir',
    format: (source: string, surah: number, ayah: number) => `${source}/${surah}/${ayah}.json`,
    priority: 3
  }
];

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second
const ENDPOINT_TIMEOUT = 5000; // 5 seconds per endpoint

// Fallback configuration
const FALLBACK_CONFIG = {
  enableLocalFallback: true,
  localFallbackMessage: 'Using local tafseer data (offline mode)',
  noDataMessage: 'Tafseer temporarily unavailable'
};

// Helper function for API calls with timeout and retry logic
const fetchWithTimeout = async (url: string, timeout = ENDPOINT_TIMEOUT): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// Enhanced fallback mechanism that tries multiple endpoints
const fetchWithFallback = async (tafseerSource: string, surahNumber: number, ayahNumber: number): Promise<any> => {
  const errors: string[] = [];
  
  // Try each endpoint in priority order
  for (const endpoint of TAFSEER_API_ENDPOINTS) {
    try {
      const url = `${endpoint.baseUrl}/${endpoint.format(tafseerSource, surahNumber, ayahNumber)}`;
      const response = await fetchWithTimeout(url);
      const data = await response.json();
      return { data, source: endpoint.name };
    } catch (error) {
      const errorMsg = `${endpoint.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
      errors.push(errorMsg);
      
      // Add delay before trying next endpoint
      if (endpoint !== TAFSEER_API_ENDPOINTS[TAFSEER_API_ENDPOINTS.length - 1]) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  // If all endpoints fail, try local static data
  if (FALLBACK_CONFIG.enableLocalFallback) {
    const localData = getLocalTafseer(surahNumber, ayahNumber);
    if (localData) {
      return {
        data: {
          text: localData,
          source: {
            id: 'local-fallback',
            name: 'Local Tafseer Data',
            author_name: 'Compiled from Classical Sources',
            language_name: 'English'
          }
        },
        source: 'Local Fallback'
      };
    }
  }
  
  // If everything fails, throw error with all attempts
  throw new Error(`All tafseer endpoints failed: ${errors.join('; ')}. Local fallback: ${FALLBACK_CONFIG.enableLocalFallback ? 'enabled but no data available' : 'disabled'}`);
};

export const getSurahData = async (surahNumber: number) => {
  try {
    const response = await fetch(`${QURAN_API_BASE}/surah/${surahNumber}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surah data:', error);
    throw error;
  }
};

export const getSurahTranslation = async (surahNumber: number, edition = 'en.asad') => {
  try {
    const response = await fetch(`${QURAN_API_BASE}/surah/${surahNumber}/${edition}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching translation:', error);
    throw error;
  }
};

export const getTafseer = async (tafseerSource = 'en-tafisr-ibn-kathir', surahNumber: number, ayahNumber: number): Promise<TafseerResponse> => {
  try {
    const result = await fetchWithFallback(tafseerSource, surahNumber, ayahNumber);
    return result.data;
  } catch (error) {
    console.error(`Error fetching tafseer for ${surahNumber}:${ayahNumber}:`, error);
    throw error;
  }
};

export const getSurah = async (surahNumber: number) => {
  try {
    // Fetch both Arabic text and English translation
    const [arabicData, translationData] = await Promise.all([
      getSurahData(surahNumber),
      getSurahTranslation(surahNumber, 'en.asad')
    ]);

    // Fetch tafseer for each ayah with enhanced fallback mechanism
    const tafseerPromises = arabicData.ayahs.map(async (ayah: any, index: number) => {
      try {
        const ayahNumber = ayah.numberInSurah || ayah.number;
        
        // Use the enhanced fallback mechanism
        const fallbackResult = await fetchWithFallback('en-tafisr-ibn-kathir', surahNumber, ayahNumber);
        const tafseerResponse = fallbackResult.data;
        
        // Handle the response format with source tracking
        const result = {
          text: tafseerResponse?.text || '',
          source: tafseerResponse?.source || {
            id: 'en-tafisr-ibn-kathir',
            name: 'Tafsir Ibn Kathir (abridged)',
            author_name: 'Hafiz Ibn Kathir',
            language_name: 'English'
          },
          // Preserve all additional tafseer data from API
          fullData: tafseerResponse || null,
          // Track which endpoint was used
          apiSource: fallbackResult.source
        };
        
        return result;
      } catch (error) {
          // Enhanced error logging with fallback source info
          if (index < 3) { // Only log first 3 errors to avoid spam
            console.error(`All tafseer sources failed for ayah ${ayah.numberInSurah || ayah.number}:`, error instanceof Error ? error.message : 'Unknown error');
          }
          const fallbackSource = getTafseerSourceInfo(1);
          return { 
             text: FALLBACK_CONFIG.noDataMessage, 
             source: fallbackSource, 
             fullData: null,
             apiSource: 'Failed - All sources unavailable'
           };
        }
    });

    const tafseerData = await Promise.all(tafseerPromises);

    // Combine the data
    const combinedAyahs = arabicData.ayahs.map((ayah: any, index: number) => {
      return {
        number: ayah.numberInSurah,
        text: ayah.text,
        translation: translationData.ayahs[index]?.text || '',
        tafseer: tafseerData[index]?.text || '',
        tafseerSource: tafseerData[index]?.source || null,
        tafseerFullData: tafseerData[index]?.fullData || null,
        tafseerApiSource: tafseerData[index]?.apiSource || 'Unknown'
      };
    });

    const result = {
      data: {
        number: arabicData.number,
        name: arabicData.name,
        englishName: arabicData.englishName,
        englishNameTranslation: arabicData.englishNameTranslation,
        numberOfAyahs: arabicData.numberOfAyahs,
        revelationType: arabicData.revelationType,
        ayahs: combinedAyahs
      }
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching complete surah data:', error);
    throw error;
  }
};

export const searchQuran = async (query: string) => {
  try {
    const response = await fetch(`${QURAN_API_BASE}/search/${encodeURIComponent(query)}/all/en`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error searching Quran:', error);
    throw error;
  }
};

// Export the quranApi object for easier imports
export const quranApi = {
  getSurah,
  getSurahData,
  getSurahTranslation,
  getTafseer,
  searchQuran
};