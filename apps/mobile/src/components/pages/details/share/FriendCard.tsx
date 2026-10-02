import { COLORS, RADIUS, SPACINGS } from '@app/tokens'
import { Check } from 'lucide-react-native'
import { Pressable, StyleSheet, View } from 'react-native'

import { AvatarCard } from '@/components/ui'

interface FriendCardProps {
  name: string
  avatarUrl: string | null
  isSelected?: boolean
  onPress?: () => void
}

const AVATAR_SIZE = 64

export function FriendCard({
  name,
  avatarUrl,
  isSelected,
  onPress
}: FriendCardProps) {
  return (
    <Pressable
      style={styles.root}
      onPress={onPress}
    >
      <AvatarCard
        name={name}
        avatarUrl={avatarUrl}
        width={AVATAR_SIZE}
        checker={
          isSelected && (
            <View style={styles.badge}>
              <Check
                size={12}
                color={COLORS.text.primary}
                strokeWidth={3}
              />
            </View>
          )
        }
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    alignItems: 'center'
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: SPACINGS[1],
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.bg.base,
    backgroundColor: COLORS.status.success
  }
})
