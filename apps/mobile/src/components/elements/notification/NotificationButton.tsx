import { COLORS, RADIUS } from '@app/tokens'
import { Bell } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/ui'

import { useNotifications, useProtectedPush } from '@/hooks'

export function NotificationButton() {
  const pushProtected = useProtectedPush()

  const { items, hasUnread } = useNotifications()

  return (
    <Button
      variant='transparent'
      icon={Bell}
      size='lg'
      isIconOnly
      onPress={() => pushProtected('/notifications')}
    >
      {hasUnread && (
        <View style={[styles.container]}>
          <Text style={[styles.count]}>{items.length}</Text>
        </View>
      )}
    </Button>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.status.success,
    borderRadius: RADIUS.full
  },
  count: {
    color: COLORS.text.primary
  }
})
