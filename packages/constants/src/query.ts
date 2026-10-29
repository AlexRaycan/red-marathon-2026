export const MIN_QUERY_LENGTH = 2

interface IQueryText {
  default: string
  process: string
  empty: string
}

export type TQueryType = 'search'
export type TScreenType = 'library'

export const EMPTY_TEXT: Record<TQueryType, IQueryText> = {
  search: {
    default: 'Find movies, series, anime, books, and games',
    process: 'Searching...',
    empty: 'Nothing found'
  }
}

export const PLACEHOLDER_TEXT: Record<TScreenType, string> = {
  library: 'Search Your Library'
}
