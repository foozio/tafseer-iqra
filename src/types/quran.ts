export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface TafseerResponse {
  code: number;
  status: string;
  data: {
    ayah_number: number;
    ayah_key: string;
    text: string;
    surah: {
      id: number;
      name: string;
      english_name: string;
      revelation_place: string;
      verses_count: number;
    };
    tafseer: {
      id: number;
      name: string;
      author_name: string;
      language_name: string;
      text: string;
    };
  };
}

export interface TafseerSource {
  id: number;
  name: string;
  author_name: string;
  language_name: string;
}

export interface SearchResult {
  surah: number;
  ayah: number;
  text: string;
  translation?: string;
  tafseer?: string;
  tafseerSource?: TafseerSource;
}