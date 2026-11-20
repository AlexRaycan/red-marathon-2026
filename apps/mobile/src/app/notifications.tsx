import { type NotificationResponse, useMyNotifications } from '@app/api'
import { usePushActions } from '@app/hooks'

import { Screen } from '@/components/ui'

import { getNotificationHref } from '@/lib'

export default function NotificationPage() {
  const { data, isPending } = useMyNotifications({ take: 50 })
  const { markRead, markAllRead } = usePushActions()

  const items = data?.status === 200 ? data.data.items : []
  const hasUnread = items.some(({ isRead }) => !isRead)

  const onPressItem = (item: NotificationResponse) => {
    if (!item.isRead) markRead(item.id)

    const href = getNotificationHref(item.entityType, item.entityId)
  }

  return <Screen></Screen>
}
