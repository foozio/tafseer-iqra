// Tafseer source mappings for known source IDs
// This provides fallback information when API doesn't return source details

export interface TafseerSourceInfo {
  id: number;
  name: string;
  author_name: string;
  language_name: string;
  description?: string;
}

export const TAFSEER_SOURCES: Record<number, TafseerSourceInfo> = {
  1: {
    id: 1,
    name: 'Tafsir Ibn Kathir',
    author_name: 'Ibn Kathir',
    language_name: 'English',
    description: 'One of the most respected and widely used commentaries of the Quran'
  },
  2: {
    id: 2,
    name: 'Tafsir Al-Jalalayn',
    author_name: 'Jalal ad-Din al-Mahalli and Jalal ad-Din as-Suyuti',
    language_name: 'English',
    description: 'A classical Sunni tafsir of the Quran'
  },
  3: {
    id: 3,
    name: 'Tafsir Al-Qurtubi',
    author_name: 'Al-Qurtubi',
    language_name: 'English',
    description: 'A comprehensive commentary focusing on legal and theological aspects'
  },
  4: {
    id: 4,
    name: 'Tafsir At-Tabari',
    author_name: 'At-Tabari',
    language_name: 'English',
    description: 'One of the earliest and most comprehensive commentaries'
  }
};

// Function to get tafseer source info with fallback
export const getTafseerSourceInfo = (sourceId: number): TafseerSourceInfo | null => {
  return TAFSEER_SOURCES[sourceId] || null;
};

// Function to get tafseer source display name
export const getTafseerSourceDisplayName = (source: any): string => {
  if (!source) return 'Unknown Source';
  
  const name = source.name || 'Unknown Tafseer';
  const author = source.author_name;
  
  return author ? `${name} by ${author}` : name;
};