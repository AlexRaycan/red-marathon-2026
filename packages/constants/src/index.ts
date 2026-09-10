import type { TMediaType, TStatus } from '@app/types'

export const STATUS_LABELS: Record<TStatus, string> = {
  want: 'Want',
  progress: 'In Progress',
  done: 'Done',
  dropped: 'Dropped'
}

export const TYPE_LABELS: Record<TMediaType, string> = {
  movie: 'Movie',
  series: 'Series',
  game: 'Game',
  book: 'Book'
}
