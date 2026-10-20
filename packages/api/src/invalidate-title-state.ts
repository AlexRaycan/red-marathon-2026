import type { QueryClient } from '@tanstack/react-query'

import {
  getLibraryTitlesInfiniteQueryKey,
  getMyTasteStatsQueryKey,
  getTitleReviewsQueryKey,
  getUserTitleQueryKey
} from './generated'

export function invalidateTitleState(queryClient: QueryClient, key: string) {
  return Promise.all(
    [
      getUserTitleQueryKey(key),
      getTitleReviewsQueryKey(key),
      getLibraryTitlesInfiniteQueryKey(),
      getMyTasteStatsQueryKey()
    ].map(queryKey => queryClient.invalidateQueries({ queryKey }))
  )
}
