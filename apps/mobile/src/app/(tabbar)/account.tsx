import { useAuthMobileLogout, useUserFindMe } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACINGS } from '@app/tokens'
import { useQueryClient } from '@tanstack/react-query'
import { Redirect, useIsFocused, useNavigation } from 'expo-router'
import hexToRgba from 'hex-to-rgba'
import { LogOut } from 'lucide-react-native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import {
  Button,
  GlassContainer,
  GlassView,
  MenuItem,
  Screen,
  ViewLayout
} from '@/components/ui'

import { AccountUserInfo } from '@/components/pages/account'
import { Toolbar } from '@/components/toolbar'

import { clearTokens, getRefreshToken } from '@/lib/token'

import { ACCOUNT_MENU } from '@/constants/account-menu.data'

export default function Account() {
  const rootNavigation = useNavigation('/')
  const isFocused = useIsFocused()

  const queryClient = useQueryClient()
  const { data, isPending: isLoading, isError } = useUserFindMe()

  const { mutate: logout, isPending } = useAuthMobileLogout({
    mutation: {
      onSettled: async () => {
        await queryClient.cancelQueries()

        await clearTokens()

        rootNavigation.reset({
          index: 0,
          routes: [
            {
              name: '(tabbar)',
              state: {
                index: 0,
                routes: [{ name: 'index' }]
              }
            }
          ]
        })

        await queryClient.resetQueries()

        /* queryClient.clear()
        router.replace('/login') */
      }
    }
  })

  const handleLogout = async () => {
    const refreshToken = await getRefreshToken()

    if (!refreshToken) return

    logout({ data: { refreshToken } })
  }

  if (isLoading) return <Screen />

  if (isError || !data.data) {
    return isFocused ? <Redirect href='/login' /> : <Screen />
  }

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
                {ACCOUNT_MENU.map((item, index) => (
                  <MenuItem
                    {...item}
                    key={item.label}
                    isLastItem={index === ACCOUNT_MENU.length - 1}
                    withChevron
                  >
                    {item.content && (
                      <Text style={menuStyles.premium}>{item.content}</Text>
                    )}
                  </MenuItem>
                ))}
              </GlassView>
            </ScrollView>
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
