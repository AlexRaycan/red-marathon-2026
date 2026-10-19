import {
  getUserTitleQueryKey,
  getLibraryTitlesQueryKey,
  useUserTitle,
  useSetTitleStatus
} from '@app/api'
import type { TLibraryStatus } from '@app/types'
import { useQueryClient } from '@tanstack/react-query'

import { useAuth } from './useAuth'

export function useLibraryStatus(key: string) {
  const queryClient = useQueryClient()

  const { isAuthenticated } = useAuth()

  const { data: myState } = useUserTitle(key, {
    query: {
      enabled: isAuthenticated
    }
  })

  const { mutate, variables, isPending } = useSetTitleStatus({
    mutation: {
      onSettled: () =>
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: getUserTitleQueryKey(key)
          }),
          queryClient.invalidateQueries({
            queryKey: getLibraryTitlesQueryKey()
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
