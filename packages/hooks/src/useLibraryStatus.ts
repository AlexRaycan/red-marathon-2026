import {
  type LibraryEntryResponseStatus,
  getDiscoverFindMyStateQueryKey,
  useDiscoverFindMyState,
  useLibrarySetStatusByDiscoverKey,
  useUserFindMe
} from '@app/api'
import { useQueryClient } from '@tanstack/react-query'

export function useLibraryStatus(key: string) {
  const queryClient = useQueryClient()

  const { data: me } = useUserFindMe()
  const isAuthenticated = me?.status === 200

  const { data: myState } = useDiscoverFindMyState(key, {
    query: {
      enabled: isAuthenticated
    }
  })

  const { mutate, variables, isPending } = useLibrarySetStatusByDiscoverKey({
    mutation: {
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: getDiscoverFindMyStateQueryKey(key)
        })
    }
  })

  const pendingStatus = isPending ? variables?.data.status : undefined
  const savedStatus = myState?.data.libraryEntry?.status ?? null

  const setStatus = (status: LibraryEntryResponseStatus) => {
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
