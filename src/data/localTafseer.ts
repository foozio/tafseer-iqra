// Local static tafseer data for critical surahs
// This serves as a fallback when all API endpoints fail

export interface LocalTafseerData {
  [surahNumber: string]: {
    [ayahNumber: number]: string;
  };
}

export const LOCAL_TAFSEER_DATA: LocalTafseerData = {
  '1': { // Al-Fatiha
    1: 'In the Name of Allah, the Most Gracious, the Most Merciful. This is the opening of the Quran and the greatest chapter, containing praise of Allah and a prayer for guidance.',
    2: 'All praise and thanks are due to Allah alone, the Lord and Sustainer of all that exists, Who created, maintains, and will judge all creation.',
    3: 'The Most Gracious, the Most Merciful - These are two of the most beautiful names of Allah, emphasizing His infinite mercy and compassion.',
    4: 'Master of the Day of Judgment - Allah is the ultimate authority on the Day when all will be held accountable for their deeds.',
    5: 'You alone we worship, and You alone we ask for help - This declares exclusive worship and dependence upon Allah alone.',
    6: 'Guide us to the straight path - A prayer for divine guidance to the correct way of life that leads to Allah\'s pleasure.',
    7: 'The path of those You have blessed, not of those who have incurred Your wrath, nor of those who have gone astray - The path of the righteous, avoiding the way of those who knew the truth but rejected it, and those who were misguided.'
  },
  '112': { // Al-Ikhlas
    1: 'Say: He is Allah, the One! - This declares the absolute oneness and uniqueness of Allah, rejecting any form of polytheism or association of partners with Allah.',
    2: 'Allah, the Eternal, Absolute - Allah is As-Samad, meaning He is the One to Whom all creation turns in their needs, and He needs nothing from anyone.',
    3: 'He begets not, nor is He begotten - Allah does not have children, parents, or family relations. He is beyond human characteristics and relationships.',
    4: 'And there is none like unto Him - Nothing in creation resembles Allah in His essence, attributes, or actions. He is absolutely unique and incomparable.'
  },
  '113': { // Al-Falaq
    1: 'Say: I seek refuge with the Lord of the dawn - Seeking protection from Allah, Who is the Creator and Controller of the daybreak and all new beginnings.',
    2: 'From the mischief of created things - Protection from all forms of evil that exist in creation, whether visible or hidden.',
    3: 'From the mischief of darkness as it overspreads - Seeking refuge from the evils that emerge and spread during the darkness of night.',
    4: 'From the mischief of those who practice witchcraft - Protection from those who engage in magic, sorcery, and other harmful occult practices.',
    5: 'And from the mischief of the envious when he envies - Seeking refuge from the harm caused by jealous and envious people who wish ill upon others.'
  },
  '114': { // An-Nas
    1: 'Say: I seek refuge with the Lord and Cherisher of mankind - Seeking protection from Allah in His capacity as the Creator, Sustainer, and Guardian of all humanity.',
    2: 'The King (or Ruler) of mankind - Allah is the ultimate Sovereign and Ruler over all human beings, with absolute authority and control.',
    3: 'The God (or Judge) of mankind - Allah is the only true deity worthy of worship, and the ultimate Judge of all human actions.',
    4: 'From the mischief of the Whisperer (of Evil), who withdraws (after his whisper) - Protection from Satan and evil influences that whisper temptations and then hide.',
    5: 'The same who whispers into the hearts of mankind - Seeking refuge from evil suggestions that are planted in human hearts and minds.',
    6: 'Among Jinns and among men - Protection from evil influences that come from both the unseen world (jinn) and from human beings.'
  }
};

// Function to get local tafseer for a specific ayah
export const getLocalTafseer = (surahNumber: number, ayahNumber: number): string | null => {
  return LOCAL_TAFSEER_DATA[surahNumber.toString()]?.[ayahNumber] || null;
};

// Function to check if local tafseer exists for a surah
export const hasLocalTafseer = (surahNumber: number): boolean => {
  return !!LOCAL_TAFSEER_DATA[surahNumber.toString()];
};

// Function to get all available local tafseer surahs
export const getAvailableLocalSurahs = (): number[] => {
  return Object.keys(LOCAL_TAFSEER_DATA).map(Number).sort((a, b) => a - b);
};