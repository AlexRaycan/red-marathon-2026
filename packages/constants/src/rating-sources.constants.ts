import type { DiscoverDetailsResponseExternalSource } from '@app/api'

interface IRatingSource {
  label: string
  color: string
  scale: number
}

export const RATINGS_SOURCES: Record<
  DiscoverDetailsResponseExternalSource,
  IRatingSource
> = {
  TMDB: {
    label: 'TMBD',
    color: '#01B4E4',
    scale: 10
  },
  RAWG: {
    label: 'RAWG',
    color: '#FFFFFF',
    scale: 5
  },
  SHIKIMORI: {
    label: 'Shikimori',
    color: '#E8762C',
    scale: 10
  },
  GOOGLE_BOOKS: {
    label: 'Google Books',
    color: '#4285F4',
    scale: 5
  }
} as const

export const METACRITIC = {
  label: 'Metacritic',
  scale: 100,
  goodScore: 75,
  mixedScore: 50
} as const

export const METACRITIC_COLORS = {
  good: '#66CC33',
  mixed: '#FFCC33',
  bad: '#FF0000'
} as const

export const AGE_RATING_LABELS: Record<string, string[]> = {
  '0+': ['G', 'TV-Y', 'TV-G', 'E'],
  '7+': ['TV-Y7', 'PG', 'TV-PG'],
  '10+': ['E10+'],
  '13+': ['PG-13', 'T'],
  '14+': ['TV-14'],
  '17+': ['R', 'R-17+', 'R+', 'M', 'TV-MA'],
  '18+': ['NC-17', 'AO', 'Rx']
}
