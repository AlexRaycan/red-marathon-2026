import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { useEffect } from 'react'

import { getNotificationHref } from '@/lib'

export function usePushTapRouting() {
  const response = Notifications.useLastNotificationResponse()

  useEffect(() => {
    if (!response) return

    const { entityType, entityId } =
      response.notification.request.content.data ?? {}

    const href = getNotificationHref(entityType, entityId)

    if (href) router.push(href)
  }, [response])
}
