import {
  getMyNotificationsQueryKey,
  useDeleteNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead
} from '@app/api'
import { useQueryClient } from '@tanstack/react-query'

export function usePushActions() {
  const queryClient = useQueryClient()

  const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: getMyNotificationsQueryKey() })

  const { mutate: markRead } = useMarkNotificationRead({
    mutation: { onSuccess }
  })

  const { mutate: markAllRead } = useMarkAllNotificationsRead({
    mutation: { onSuccess }
  })

  const { mutate: remove } = useDeleteNotification({
    mutation: { onSuccess }
  })

  return {
    markRead: (id: string) => markRead({ id }),
    markAllRead: () => markAllRead(),
    remove: (id: string) => remove({ id })
  }
}
