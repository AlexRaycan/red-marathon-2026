import { COLORS, FONT_SIZE, RADIUS, SPACINGS } from '@app/tokens'
import { Image } from 'expo-image'
import type { ReactNode } from 'react'
import {
  type ImageStyle,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle
} from 'react-native'

interface AvatarCardProps {
  name: string
  role?: string
  avatarUrl: string | null
  width?: number
  checker?: ReactNode
  style?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
}

export function AvatarCard({
  name,
  role,
  avatarUrl,
  width = 100,
  checker,
  style,
  imageStyle
}: AvatarCardProps) {
  return (
    <View
      key={name}
      style={[styles.container, { width }, style]}
    >
      {/* TODO: add fallback image */}
      <View style={[styles.photoContainer]}>
        <Image
          source={avatarUrl}
          style={[styles.photo, imageStyle]}
          contentFit='cover'
        />
        {checker}
      </View>

      <View style={[styles.labelContainer]}>
        <Text style={[styles.label]}>{name}</Text>
        {role && <Text style={[styles.roleLabel]}>{role}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: SPACINGS[2]
  },
  photoContainer: {
    position: 'relative'
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bg.card
  },
  labelContainer: {
    gap: SPACINGS[1]
  },
  label: {
    color: COLORS.text.primary,
    textAlign: 'center',
    fontSize: FONT_SIZE.sm
  },
  roleLabel: {
    color: COLORS.text.muted,
    textAlign: 'center',
    fontSize: FONT_SIZE.xs
  }
})
