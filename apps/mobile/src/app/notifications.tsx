import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import { CheckCheck } from 'lucide-react-native'
import { FlatList, StyleSheet, Text } from 'react-native'

import { Button, Screen } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import { NotificationItem } from '@/components/screens/notifications'

import { useNotifications, useSpaces } from '@/hooks'

export default function NotificationPage() {
  const { items, hasUnread, markAllRead, onPressItem } = useNotifications()

  const { toolbarSpace } = useSpaces()

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
