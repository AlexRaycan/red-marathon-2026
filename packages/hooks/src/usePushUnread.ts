import { useMyNotifications } from '@app/api'

import { useAuth } from './useAuth'

export function usePushUnread() {
  const { isAuthenticated } = useAuth()

  const { data } = useMyNotifications(
    { take: 1, isUnread: 'true' },
    { query: { enabled: isAuthenticated } }
  )

  return data?.status === 200 ? data.data.unreadCount : 0
}
