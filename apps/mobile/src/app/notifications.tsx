import { type NotificationResponse, useMyNotifications } from '@app/api'
import { usePushActions } from '@app/hooks'
import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import { router } from 'expo-router'
import { CheckCheck } from 'lucide-react-native'
import { FlatList, StyleSheet, Text } from 'react-native'

import { Button, Screen } from '@/components/ui'

import { MOCK_NOTIFICATIONS, Toolbar } from '@/components/elements'
import { NotificationItem } from '@/components/screens/notifications'

import { useSpaces } from '@/hooks'

import { getNotificationHref } from '@/lib'

export default function NotificationPage() {
  const { data } = useMyNotifications(
    { take: 50 },
    { query: { enabled: !__DEV__ } }
  )
  const { markRead, markAllRead } = usePushActions()

  const { toolbarSpace } = useSpaces()

  const items = __DEV__
    ? MOCK_NOTIFICATIONS
    : data?.status === 200
      ? data.data.items
      : []
  const hasUnread = items.some(({ isRead }) => !isRead)

  const onPressItem = (item: NotificationResponse) => {
    if (__DEV__) return

    if (!item.isRead) markRead(item.id)

    const href = getNotificationHref(item.entityType, item.entityId)

    if (href) router.push(href)
  }

  return (
    <Screen>
      <Toolbar
        leftSide='Notifications'
        rightSide={
          <Button
            label='Read All'
            icon={CheckCheck}
            variant='secondary'
            disabled={!hasUnread}
            accessibilityLabel='Mark all notifications as read'
            onPress={() => {
              if (!__DEV__) markAllRead()
            }}
          />
        }
        isBackButton
      />

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.list, { paddingTop: toolbarSpace }]}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={onPressItem}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No notifications yet</Text>
        }
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: SPACINGS[2],
    padding: LAYOUT['space-horizontal']
  },
  empty: {
    color: COLORS.text['little-muted'],
    textAlign: 'center',
    marginTop: SPACINGS[8]
  }
})
