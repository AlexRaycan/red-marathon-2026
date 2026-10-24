import {
  invalidateTitleState,
  useRemoveFromLibrary,
  useSetTitleStatus,
  useUserTitle
} from '@app/api'
import { ADD_TO_LIBRARY_ACTION, LIBRARY_STATUS_ACTIONS } from '@app/constants'
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

  const onSettled = () => invalidateTitleState(queryClient, key)

  const {
    mutate: setStatusMutation,
    variables: statusVariables,
    isPending: isSettingStatus
  } = useSetTitleStatus({
    mutation: { onSettled: onSettled }
  })

  const { mutate: removeMutation, isPending: isRemovingPending } =
    useRemoveFromLibrary({ mutation: { onSettled } })

  const pendingStatus = isSettingStatus
    ? statusVariables?.data.status
    : undefined
  const savedStatus = myState?.data.libraryEntry?.status ?? null
  const status = isRemovingPending ? null : (pendingStatus ?? savedStatus)

  const setStatus = (status: TLibraryStatus) => {
    setStatusMutation({
      key,
      data: {
        status
      }
    })
  }

  const removeFromLibrary = () => {
    removeMutation({ key })
  }

  const action =
    status && status !== 'COMPLETED'
      ? LIBRARY_STATUS_ACTIONS[status]
      : ADD_TO_LIBRARY_ACTION

  return {
    isAuthenticated,
    status,
    action,
    isCompletedStatus: status === 'COMPLETED',
    rating: myState?.data.review?.rating ?? null,
    setStatus,
    removeFromLibrary
  }
}
