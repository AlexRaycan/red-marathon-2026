import { useAuthMobileLogout, useUserFindMe } from '@app/api'
import { COLORS, FONT_SIZE, RADIUS, SPACINGS } from '@app/tokens'
import { useQueryClient } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { Redirect, router } from 'expo-router'
import hexToRgba from 'hex-to-rgba'
import { useMemo } from 'react'
import { StyleSheet, Text } from 'react-native'

import { Button } from '@/components/ui/Button'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { GlassView } from '@/components/ui/GlassView'
import { Screen } from '@/components/ui/Screen'

import { clearTokens, getRefreshToken } from '@/lib/token'

export default function Account() {
  const queryClient = useQueryClient()
  const { data, isPending: isLoading, isError } = useUserFindMe()

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
    url.searchParams.set('seed', data?.data.id ?? '')
    url.searchParams.set('backgroundColor', COLORS.status.success)
    url.searchParams.set('borderRadius', '50')

    return url.toString()
  }, [data])

  if (isLoading) return <Screen />

  if (isError || !data.data) return <Redirect href='/login' />

  return (
    <Screen>
      {/*<Toolbar leftSide='Account' />*/}
      <GlassContainer style={styles.root}>
        <GlassView
          // tintColor={hexToRgba(COLORS.status.success, 0.3)}
          style={styles.avatar}
        >
          <Image
            source={avatar}
            transition={300}
            style={StyleSheet.absoluteFill}
          />
        </GlassView>
        <GlassView style={styles.nameContainer}>
          <Text style={styles.name}>{data.data.email}</Text>
        </GlassView>

        <Button
          label='Sign Out'
          variant='secondary'
          tintColor={hexToRgba(COLORS.status.error, 0.3)}
          disabled={isPending}
          onPress={handleLogout}
        />
      </GlassContainer>
    </Screen>
  )
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACINGS[3]
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.full,
    overflow: 'hidden'
  },
  nameContainer: {
    borderRadius: RADIUS.full,
    paddingVertical: SPACINGS[3],
    paddingHorizontal: SPACINGS[5]
  },
  name: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['2xl'],
    textAlign: 'center'
  }
})
