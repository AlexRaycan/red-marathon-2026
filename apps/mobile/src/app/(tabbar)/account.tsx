import { useAuthMobileLogout, useUserFindMe } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACINGS } from '@app/tokens'
import { useQueryClient } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Redirect, router } from 'expo-router'
import hexToRgba from 'hex-to-rgba'
import {
  LogOut,
  MessageCircleMoreIcon,
  Plus,
  Wallet2
} from 'lucide-react-native'
import { Heart } from 'lucide-react-native/icons'
import { useMemo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/Button'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { GlassView } from '@/components/ui/GlassView'
import { MenuItem } from '@/components/ui/MenuItem'
import { Screen } from '@/components/ui/Screen'
import { Toolbar } from '@/components/ui/Toolbar'
import { ViewLayout } from '@/components/ui/ViewLayout'

import { clearTokens, getRefreshToken } from '@/lib/token'

export default function Account() {
  const inset = useSafeAreaInsets()

  const queryClient = useQueryClient()
  const { data, isPending: isLoading, isError } = useUserFindMe()

  const { id, profile, username, email } = data?.data ?? {}

  const { mutate: logout, isPending } = useAuthMobileLogout({
    mutation: {
      onSettled: async () => {
        await clearTokens()
        queryClient.clear()
        router.replace('/login')
      }
    }
  })

  const handleLogout = async () => {
    const refreshToken = await getRefreshToken()

    if (!refreshToken) return

    logout({ data: { refreshToken } })
  }

  const avatar = useMemo(() => {
    const url = new URL('https://api.dicebear.com/10.x/blobs/png')
    url.searchParams.set('seed', id ?? '')
    url.searchParams.set('backgroundColor', COLORS.status.success)
    url.searchParams.set('borderRadius', '50')

    return url.toString()
  }, [id])

  if (isLoading) return <Screen />

  if (isError || !data.data) return <Redirect href='/login' />

  return (
    <Screen withPaddings>
      <Toolbar
        leftSide='Account'
        rightSide={
          <Button
            icon={LogOut}
            variant='secondary'
            tintColor={hexToRgba(COLORS.status.error, 0.3)}
            disabled={isPending}
            onPress={handleLogout}
          />
        }
      />
      <ViewLayout.Root>
        <GlassContainer style={styles.root}>
          <View style={styles.content}>
            <View style={userStyles.userInfo}>
              <LinearGradient
                colors={[hexToRgba(COLORS.status.success, 0.3), COLORS.bg.base]}
                locations={[0.15, 1]}
                style={[
                  StyleSheet.absoluteFill,
                  { marginHorizontal: -60, marginTop: -inset.top * 2 }
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
                <Pressable>
                  <Text style={avatarStyles.avatarEditButton}>Edit</Text>
                </Pressable>
              </View>

              <View style={userStyles.nameContainer}>
                <Text style={userStyles.name}>
                  {profile?.displayName ?? username}
                </Text>
                <Text style={userStyles.email}>{email}</Text>
              </View>
              <Button
                // variant='secondary'
                label='Add a new profile'
                icon={Plus}
              />
            </View>
            <GlassView
              isInteractive
              pointerEvents='box-none'
              style={menuStyles.root}
            >
              <MenuItem
                label='Subscription'
                icon={Wallet2}
                withChevron
              >
                <Text style={menuStyles.premium}>Premium</Text>
              </MenuItem>
              <MenuItem
                label='Watchlist'
                icon={Heart}
                withChevron
              />
              <MenuItem
                label='Audio & Subtitle'
                icon={MessageCircleMoreIcon}
                withChevron
              />
            </GlassView>

            {/* <View style={styles.fullWidth}>
              <Button
                label='Sign Out'
                icon={LogOut}
                variant='secondary'
                tintColor={hexToRgba(COLORS.status.error, 0.3)}
                disabled={isPending}
                onPress={handleLogout}
              />
            </View> */}
          </View>

          {/*{__DEV__ && <TokenDebug />}*/}
        </GlassContainer>
      </ViewLayout.Root>
    </Screen>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    gap: SPACINGS[5]
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
    gap: SPACINGS[4]
  },
  fullWidth: {
    alignSelf: 'stretch'
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

const userStyles = StyleSheet.create({
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

const menuStyles = StyleSheet.create({
  root: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACINGS[5],
    borderBottomColor: hexToRgba(COLORS.primary, 0.1),
    borderBottomWidth: 1
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[3]
  },
  label: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold
  },
  premium: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold
  }
})
