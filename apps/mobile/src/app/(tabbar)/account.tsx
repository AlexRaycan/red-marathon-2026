import { useAuthMobileLogout, useUserFindMe } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACINGS } from '@app/tokens'
import { useQueryClient } from '@tanstack/react-query'
import { Redirect, router } from 'expo-router'
import hexToRgba from 'hex-to-rgba'
import { Bell, CreditCard, LogOut, Users2 } from 'lucide-react-native'
import { Heart } from 'lucide-react-native/icons'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AccountUserInfo } from '@/components/pages/account/AccountUserInfo'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Button } from '@/components/ui/Button'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { GlassView } from '@/components/ui/GlassView'
import { MenuItem } from '@/components/ui/MenuItem'
import { Screen } from '@/components/ui/Screen'
import { ViewLayout } from '@/components/ui/ViewLayout'

import { clearTokens, getRefreshToken } from '@/lib/token'

const ACCOUNT_MENU_ITEMS = [
  {
    label: 'Subscription',
    icon: CreditCard,
    content: 'Premium',
    onPress: () => router.push('/subscription')
  },
  {
    label: 'Watchlist',
    icon: Heart,
    onPress: () => router.push('/library')
  },
  {
    label: 'Friends',
    icon: Users2,
    onPress: () => router.push('/')
  },
  {
    label: 'Notifications',
    icon: Bell,
    onPress: () => router.push('/')
  }
]

export default function Account() {
  const inset = useSafeAreaInsets()

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
            <AccountUserInfo data={data?.data} />

            <ScrollView showsVerticalScrollIndicator={false}>
              <GlassView
                isInteractive
                pointerEvents='box-none'
                style={menuStyles.glass}
              >
                {ACCOUNT_MENU_ITEMS.map((item, index) => (
                  <MenuItem
                    {...item}
                    key={item.label}
                    isLastItem={index === ACCOUNT_MENU_ITEMS.length - 1}
                  >
                    {item.content && (
                      <Text style={menuStyles.premium}>{item.content}</Text>
                    )}
                  </MenuItem>
                ))}
              </GlassView>
            </ScrollView>

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
    gap: SPACINGS[6]
  },
  fullWidth: {
    alignSelf: 'stretch'
  }
})

const menuStyles = StyleSheet.create({
  glass: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden'
  },
  premium: {
    color: COLORS.status.success,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold
  }
})
