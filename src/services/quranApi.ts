import { TafseerResponse } from '@/types/quran';
import { SURAHS } from '@/data/surahs';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';
const TAFSEER_API_BASE = 'http://api.quran-tafseer.com';

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

export const getTafseer = async (tafseerSource = 1, surahNumber: number, ayahNumber: number): Promise<TafseerResponse> => {
  try {
    const response = await fetch(`${TAFSEER_API_BASE}/tafseer/${tafseerSource}/${surahNumber}/${ayahNumber}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tafseer:', error);
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

    // Fetch tafseer for each ayah
    const tafseerPromises = arabicData.ayahs.map(async (ayah: any) => {
      try {
        const tafseerResponse = await getTafseer(1, surahNumber, ayah.numberInSurah || ayah.number);
        return tafseerResponse.data?.tafseer?.text || '';
      } catch (error) {
        console.warn(`Failed to fetch tafseer for ayah ${ayah.number}:`, error);
        return '';
      }
    });

    const tafseerData = await Promise.all(tafseerPromises);

    // Combine the data
    const combinedAyahs = arabicData.ayahs.map((ayah: any, index: number) => ({
      number: ayah.number,
      text: ayah.text,
      translation: translationData.ayahs[index]?.text || '',
      tafseer: tafseerData[index] || ''
    }));

    return {
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