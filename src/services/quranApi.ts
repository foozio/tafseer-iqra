import { Surah, TafseerResponse } from '@/types/quran';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';
const TAFSEER_API_BASE = 'http://api.quran-tafseer.com';

// List of all 114 Surahs with their information
export const SURAHS: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 3, name: "آل عمران", englishName: "Ali 'Imran", englishNameTranslation: "Family of Imran", numberOfAyahs: 200, revelationType: "Medinan" },
  { number: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan" },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "Medinan" },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", englishNameTranslation: "The Cattle", numberOfAyahs: 165, revelationType: "Meccan" },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", englishNameTranslation: "The Heights", numberOfAyahs: 206, revelationType: "Meccan" },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", englishNameTranslation: "The Spoils of War", numberOfAyahs: 75, revelationType: "Medinan" },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", englishNameTranslation: "The Repentance", numberOfAyahs: 129, revelationType: "Medinan" },
  { number: 10, name: "يونس", englishName: "Yunus", englishNameTranslation: "Jonah", numberOfAyahs: 109, revelationType: "Meccan" },
  // Add more surahs as needed - truncated for brevity
];

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