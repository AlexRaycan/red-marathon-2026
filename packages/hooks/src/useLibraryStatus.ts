import {
  getDiscoverFindMyStateQueryKey,
  getLibraryFindAllQueryKey,
  useDiscoverFindMyState,
  useLibrarySetStatusByDiscoverKey
} from '@app/api'
import type { TLibraryStatus } from '@app/types'
import { useQueryClient } from '@tanstack/react-query'

import { useAuth } from './useAuth'

export function useLibraryStatus(key: string) {
  const queryClient = useQueryClient()

  const { isAuthenticated } = useAuth()

  const { data: myState } = useDiscoverFindMyState(key, {
    query: {
      enabled: isAuthenticated
    }
  })

  const { mutate, variables, isPending } = useLibrarySetStatusByDiscoverKey({
    mutation: {
      onSettled: () =>
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: getDiscoverFindMyStateQueryKey(key)
          }),
          queryClient.invalidateQueries({
            queryKey: getLibraryFindAllQueryKey()
          })
        ])
    }
  })

  const pendingStatus = isPending ? variables?.data.status : undefined
  const savedStatus = myState?.data.libraryEntry?.status ?? null

  const setStatus = (status: TLibraryStatus) => {
    mutate({
      key,
      data: {
        status
      }
    })
  }

  return {
    isAuthenticated,
    status: pendingStatus ?? savedStatus,
    rating: myState?.data.review?.rating ?? null,
    setStatus
  }
}
