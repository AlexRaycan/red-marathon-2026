export const MIN_QUERY_LENGTH = 2

interface IQueryText {
  default: string
  process: string
  empty: string
}

export type TQueryType = 'search'

export const EMPTY_TEXT: Record<TQueryType, IQueryText> = {
  search: {
    default: 'Find movies, series, anime, books, and games',
    process: 'Searching...',
    empty: 'Nothing found'
  }
}
