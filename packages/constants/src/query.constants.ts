export const MIN_QUERY_LENGTH = 2

interface IQueryText {
  default: string
  process: string
  empty: string
}

export type TQueryType = 'search' | 'library' | 'collections' | 'collection'

export const EMPTY_TEXT: Record<TQueryType, IQueryText> = {
  search: {
    default: 'Find movies, series, anime, books, and games',
    process: 'Searching...',
    empty: 'Nothing found'
  },
  library: {
    default: 'No titles in your library yet',
    process: 'Searching your library...',
    empty: 'Nothing found in your library'
  },
  collections: {
    default: 'No collection yet',
    process: 'Searching your collections...',
    empty: 'Nothing found in your collections'
  },
  collection: {
    default: 'No titles in this collection yet',
    process: 'Searching your titles in the collection...',
    empty: 'Nothing found in your collection'
  }
}

export const PLACEHOLDER_TEXT: Record<TQueryType, string> = {
  search: 'Search titles',
  library: 'Search your library',
  collections: 'Search your collections',
  collection: 'Search titles in this collection'
}
