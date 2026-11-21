import { type NotificationResponse, useMyNotifications } from '@app/api'
import { usePushActions } from '@app/hooks'

import { MOCK_NOTIFICATIONS } from '@/components/elements/notification/notifications.data'

import { getNotificationHref } from '@/lib'

import { useProtectedPush } from '../useProtectedPush'

export function useNotifications() {
  const { markRead, markAllRead } = usePushActions()
  const pushProtected = useProtectedPush()

  const { data } = useMyNotifications(
    { take: 50 },
    { query: { enabled: !__DEV__ } }
  )

  const items = __DEV__
    ? MOCK_NOTIFICATIONS
    : data?.status === 200
      ? data.data.items
      : []

  const hasUnread = items.some(({ isRead }) => !isRead)

  const onPressItem = (item: NotificationResponse) => {
    if (!__DEV__ && !item.isRead) markRead(item.id)

    const href = getNotificationHref(item.entityType, item.entityId)

    if (href) pushProtected(href)
  }

  return {
    items,
    hasUnread,
    markRead,
    markAllRead,
    onPressItem
  }
}
