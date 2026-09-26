import type { UserResponse } from '@app/api'
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  LAYOUT,
  RADIUS,
  SPACINGS
} from '@app/tokens'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import hexToRgba from 'hex-to-rgba'
import { useMemo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { GlassView } from '@/components/ui/GlassView'

interface AccountHeaderProps {
  data: UserResponse
}

export function AccountUserInfo({ data }: AccountHeaderProps) {
  const inset = useSafeAreaInsets()

  const { id, profile, username, email } = data

  const avatar = useMemo(() => {
    const url = new URL('https://api.dicebear.com/10.x/blobs/png')
    url.searchParams.set('seed', id ?? '')
    url.searchParams.set('backgroundColor', COLORS.status.success)
    url.searchParams.set('borderRadius', '50')

    return url.toString()
  }, [id])

  return (
    <View style={styles.userInfo}>
      <LinearGradient
        colors={[hexToRgba(COLORS.status.success, 0.3), COLORS.bg.base]}
        locations={[0.1, 1]}
        style={[
          StyleSheet.absoluteFill,
          {
            marginHorizontal: -LAYOUT['space-horizontal'],
            marginTop: -inset.top * 2
          }
        ]}
        pointerEvents='none'
      />

      <View style={avatarStyles.avatarContainer}>
        <GlassView style={avatarStyles.avatar}>
          <Image
            source={avatar}
            transition={300}
            style={StyleSheet.absoluteFill}
          />
        </GlassView>
        <Pressable onPress={() => router.push('/settings')}>
          <Text style={avatarStyles.avatarEditButton}>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{profile?.displayName ?? username}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userInfo: {
    position: 'relative',
    alignItems: 'center',
    gap: SPACINGS[4],
    paddingVertical: SPACINGS[10]
  },
  nameContainer: {
    alignItems: 'center',
    gap: SPACINGS[2]
  },
  name: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    textAlign: 'center'
  },
  email: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.xs,
    textAlign: 'center'
  }
})

const avatarStyles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    gap: SPACINGS[3]
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.full,
    overflow: 'hidden'
  },
  avatarEditButton: {
    textAlign: 'center',
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm
  }
})
