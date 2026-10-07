import type {
  LibraryEntryResponseStatus,
  TitleListItemResponseType
} from '@app/api'

export const STATUS_LABELS: Record<LibraryEntryResponseStatus, string> = {
  PLANNED: 'Planned',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  ON_HOLD: 'On Hold',
  DROPPED: 'Dropped'
}

export const TYPE_LABELS: Record<TitleListItemResponseType, string> = {
  MOVIE: 'Movie',
  TV_SHOW: 'Series',
  GAME: 'Game',
  BOOK: 'Book',
  ANIME: 'Anime'
}

export const PROJECT_NAME = 'SagaSet'
export const AI_NAME = 'SagaCue'

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'

export * from './auth'
export * from './library'
export * from './platforms'
export * from './reviews'
export * from './roles'
