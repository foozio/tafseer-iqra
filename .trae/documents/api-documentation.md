# Tafseer Iqra - API Documentation

## Overview

This document provides comprehensive information about the external APIs used in the Tafseer Iqra application, including endpoints, request/response formats, error handling, and usage examples.

## API Providers

### 1. AlQuran.cloud API
**Base URL**: `https://api.alquran.cloud/v1`
**Purpose**: Primary source for Quranic text, translations, and metadata
**Authentication**: None required (public API)
**Rate Limits**: Not specified, use responsibly

### 2. Quran Tafseer API
**Base URL**: `http://api.quran-tafseer.com`
**Purpose**: Detailed Tafseer (interpretations) for verses
**Authentication**: None required (public API)
**Rate Limits**: Not specified
**Note**: Uses HTTP (not HTTPS) - consider security implications

## Detailed API Endpoints

### 1. Get Surah Data

**Endpoint**: `GET /surah/{surahNumber}`
**Purpose**: Retrieve complete surah with Arabic text and metadata

**Parameters**:
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|----------|
| surahNumber | integer | Yes | Surah number (1-114) | 1 |

**Request Example**:
```javascript
const response = await fetch('https://api.alquran.cloud/v1/surah/1');
const data = await response.json();
```

**Response Structure**:
```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "number": 1,
    "name": "سُورَةُ ٱلْفَاتِحَةِ",
    "englishName": "Al-Fatihah",
    "englishNameTranslation": "The Opening",
    "numberOfAyahs": 7,
    "revelationType": "Meccan",
    "ayahs": [
      {
        "number": 1,
        "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        "numberInSurah": 1,
        "juz": 1,
        "manzil": 1,
        "page": 1,
        "ruku": 1,
        "hizbQuarter": 1,
        "sajda": false
      }
    ]
  }
}
```

**Error Responses**:
```json
{
  "code": 400,
  "status": "Bad Request",
  "data": "Invalid surah number"
}
```

### 2. Get Surah Translation

**Endpoint**: `GET /surah/{surahNumber}/{edition}`
**Purpose**: Retrieve surah with specific translation

**Parameters**:
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|----------|
| surahNumber | integer | Yes | Surah number (1-114) | 2 |
| edition | string | Yes | Translation edition identifier | en.asad |

**Available Editions**:
| Edition ID | Language | Translator | Description |
|------------|----------|------------|-------------|
| en.asad | English | Muhammad Asad | The Message of the Quran |
| en.pickthall | English | Marmaduke Pickthall | The Meaning of the Glorious Quran |
| en.yusufali | English | Abdullah Yusuf Ali | The Holy Quran |
| en.sahih | English | Saheeh International | The Quran: English Translation |
| ar.alafasy | Arabic | Mishary Rashid Alafasy | Audio recitation |

**Request Example**:
```javascript
const response = await fetch('https://api.alquran.cloud/v1/surah/2/en.asad');
const data = await response.json();
```

**Response Structure**:
```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "number": 2,
    "name": "سُورَةُ البَقَرَةِ",
    "englishName": "Al-Baqarah",
    "englishNameTranslation": "The Cow",
    "numberOfAyahs": 286,
    "revelationType": "Medinan",
    "ayahs": [
      {
        "number": 1,
        "text": "Alif. Lam. Mim.",
        "numberInSurah": 1,
        "juz": 1,
        "manzil": 1,
        "page": 2,
        "ruku": 1,
        "hizbQuarter": 1,
        "sajda": false
      }
    ],
    "edition": {
      "identifier": "en.asad",
      "language": "en",
      "name": "The Message of the Quran",
      "englishName": "Muhammad Asad",
      "type": "translation"
    }
  }
}
```

### 3. Get Tafseer

**Endpoint**: `GET /tafseer/{tafseerSource}/{surahNumber}/{ayahNumber}`
**Purpose**: Retrieve detailed interpretation for specific verse

**Parameters**:
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|----------|
| tafseerSource | integer | Yes | Tafseer source ID | 1 |
| surahNumber | integer | Yes | Surah number (1-114) | 1 |
| ayahNumber | integer | Yes | Ayah number within surah | 1 |

**Tafseer Sources**:
| Source ID | Author | Language | Description |
|-----------|--------|----------|-------------|
| 1 | Ibn Kathir | Arabic | Tafsir al-Quran al-Azim |
| 2 | Al-Jalalayn | Arabic | Tafsir al-Jalalayn |
| 3 | Al-Tabari | Arabic | Jami' al-bayan |
| 4 | Al-Qurtubi | Arabic | Al-Jami' li-ahkam al-Quran |

**Request Example**:
```javascript
const response = await fetch('http://api.quran-tafseer.com/tafseer/1/1/1');
const data = await response.json();
```

**Response Structure**:
```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "ayah_number": 1,
    "ayah_key": "1:1",
    "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    "surah": {
      "id": 1,
      "name": "الفاتحة",
      "english_name": "Al-Fatihah",
      "revelation_place": "makkah",
      "verses_count": 7
    },
    "tafseer": {
      "id": 1,
      "name": "تفسير ابن كثير",
      "author_name": "ابن كثير",
      "language_name": "arabic",
      "text": "يُسْتَحَبُّ أَنْ يَقُولَ قَبْلَ الْقِرَاءَةِ: أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ..."
    }
  }
}
```

### 4. Search Quran

**Endpoint**: `GET /search/{query}/all/{language}`
**Purpose**: Search across all Quranic content

**Parameters**:
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|----------|
| query | string | Yes | Search term (URL encoded) | mercy |
| language | string | Yes | Language code for search | en |

**Request Example**:
```javascript
const query = encodeURIComponent('mercy');
const response = await fetch(`https://api.alquran.cloud/v1/search/${query}/all/en`);
const data = await response.json();
```

**Response Structure**:
```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "count": 114,
    "totalCount": 114,
    "totalPages": 1,
    "currentPage": 1,
    "matches": [
      {
        "number": 1,
        "text": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        "edition": {
          "identifier": "en.sahih",
          "language": "en",
          "name": "Saheeh International",
          "englishName": "Saheeh International",
          "type": "translation"
        },
        "surah": {
          "number": 1,
          "name": "سُورَةُ ٱلْفَاتِحَةِ",
          "englishName": "Al-Fatihah",
          "englishNameTranslation": "The Opening",
          "numberOfAyahs": 7,
          "revelationType": "Meccan"
        },
        "numberInSurah": 1
      }
    ]
  }
}
```

## Implementation Examples

### React Query Integration

```typescript
import { useQuery } from '@tanstack/react-query';
import { getSurahData, getSurahTranslation, getTafseer, searchQuran } from '@/services/quranApi';

// Fetch surah data
const useSurahData = (surahNumber: number) => {
  return useQuery({
    queryKey: ['surah', surahNumber],
    queryFn: () => getSurahData(surahNumber),
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Fetch translation
const useSurahTranslation = (surahNumber: number, edition = 'en.asad') => {
  return useQuery({
    queryKey: ['translation', surahNumber, edition],
    queryFn: () => getSurahTranslation(surahNumber, edition),
    staleTime: 1000 * 60 * 60,
  });
};

// Fetch tafseer
const useTafseer = (surahNumber: number, ayahNumber: number, source = 1) => {
  return useQuery({
    queryKey: ['tafseer', source, surahNumber, ayahNumber],
    queryFn: () => getTafseer(source, surahNumber, ayahNumber),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (tafseer rarely changes)
  });
};

// Search functionality
const useQuranSearch = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchQuran(query),
    enabled: !!query && query.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
```

### Error Handling

```typescript
const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    
    // Network errors
    if (error.message.includes('fetch')) {
      return 'Network error. Please check your internet connection.';
    }
    
    // API-specific errors
    if (error.message.includes('404')) {
      return 'The requested content was not found.';
    }
    
    if (error.message.includes('500')) {
      return 'Server error. Please try again later.';
    }
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Usage in component
const SurahComponent = ({ surahNumber }: { surahNumber: number }) => {
  const { data, isLoading, error } = useSurahData(surahNumber);
  
  if (isLoading) return <SurahSkeleton />;
  
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{handleApiError(error)}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }
  
  return <SurahContent data={data} />;
};
```

### Caching Strategy

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Surah data rarely changes, cache for 24 hours
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      
      // Retry failed requests
      retry: (failureCount, error) => {
        // Don't retry on 404s
        if (error instanceof Error && error.message.includes('404')) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

### Offline Support

```typescript
// Service worker for caching API responses
const CACHE_NAME = 'tafseer-api-v1';
const API_URLS = [
  'https://api.alquran.cloud/v1/surah/',
  'http://api.quran-tafseer.com/tafseer/'
];

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Cache API responses
  if (API_URLS.some(apiUrl => url.includes(apiUrl))) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            // Return cached response
            return response;
          }
          
          // Fetch and cache new response
          return fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
```

## Rate Limiting and Best Practices

### Request Throttling

```typescript
// Debounce search requests
import { useMemo } from 'react';
import { debounce } from 'lodash';

const useSearchWithDebounce = (query: string, delay = 500) => {
  const debouncedQuery = useMemo(
    () => debounce((q: string) => q, delay),
    [delay]
  );
  
  const [debouncedValue, setDebouncedValue] = useState(query);
  
  useEffect(() => {
    const handler = debouncedQuery(query);
    setDebouncedValue(handler);
  }, [query, debouncedQuery]);
  
  return debouncedValue;
};
```

### Request Batching

```typescript
// Batch multiple ayah requests
const fetchMultipleAyahs = async (requests: Array<{surah: number, ayah: number}>) => {
  const promises = requests.map(req => 
    getTafseer(1, req.surah, req.ayah).catch(error => ({ error, ...req }))
  );
  
  return Promise.all(promises);
};
```

## Security Considerations

1. **Mixed Content**: The Tafseer API uses HTTP while the main API uses HTTPS. Consider:
   - Implementing a proxy server for HTTPS
   - Warning users about mixed content
   - Using alternative HTTPS Tafseer sources

2. **Input Validation**: Always validate and sanitize search queries:
   ```typescript
   const sanitizeQuery = (query: string): string => {
     return query
       .trim()
       .replace(/[<>"'&]/g, '') // Remove potentially harmful characters
       .substring(0, 100); // Limit length
   };
   ```

3. **Error Information**: Don't expose sensitive error details to users:
   ```typescript
   const sanitizeError = (error: string): string => {
     // Return generic error messages in production
     return process.env.NODE_ENV === 'production' 
       ? 'An error occurred while fetching data'
       : error;
   };
   ```

## Testing API Integration

```typescript
// Mock API responses for testing
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://api.alquran.cloud/v1/surah/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        code: 200,
        status: 'OK',
        data: {
          number: parseInt(id as string),
          name: 'Test Surah',
          englishName: 'Test',
          numberOfAyahs: 7,
          ayahs: []
        }
      })
    );
  })
);

// Test setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

This comprehensive API documentation provides all the necessary information for developers to effectively integrate and work with the external APIs used in the Tafseer Iqra application.