import type { QueryClient } from '@tanstack/react-query'

import {
  getCollectionByIdQueryKey,
  getMyCollectionsQueryKey,
  getUserTitleQueryKey
} from './generated'

export function invalidateCollectionState(
  queryClient: QueryClient,
  collectionId: string,
  titleKey?: string
) {
  const queryKeys = [
    getMyCollectionsQueryKey(),
    getCollectionByIdQueryKey(collectionId),
    ...(titleKey ? [getUserTitleQueryKey(titleKey)] : [])
  ]

  return Promise.all(
    queryKeys.map(queryKey => queryClient.invalidateQueries({ queryKey }))
  )
}
