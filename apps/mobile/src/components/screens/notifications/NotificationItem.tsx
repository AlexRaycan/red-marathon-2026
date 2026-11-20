import { type NotificationResponse, title } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACINGS } from '@app/tokens'
import { StyleSheet, Text, View } from 'react-native'

import { AnimatedPressable } from '@/components/ui'

interface NotificationItemProps {
  item: NotificationResponse
  onPress: (item: NotificationResponse) => void
}

export function NotificationItem({ item, onPress }: NotificationItemProps) {
  return (
    <AnimatedPressable
      style={styles.root}
      onPress={() => onPress(item)}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      {!item.isRead && <View style={styles.dot} />}
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[3],
    padding: SPACINGS[4],
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.bg.base
  },
  content: {
    flex: 1,
    gap: SPACINGS[1]
  },
  title: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semibold
  },
  message: {
    color: COLORS.text['little-muted'],
    fontSize: FONT_SIZE.sm
  },
  date: {
    color: COLORS.text['little-muted'],
    fontSize: FONT_SIZE.xs
  },
  dot: {
    width: 10,
    aspectRatio: 1,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.status.success
  }
})
