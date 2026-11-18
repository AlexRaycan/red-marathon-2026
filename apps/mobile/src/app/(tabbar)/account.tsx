import { useCurrentUser, useMobileLogout } from '@app/api'
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  LAYOUT,
  RADIUS,
  SPACINGS
} from '@app/tokens'
import { useQueryClient } from '@tanstack/react-query'
import { Redirect, router, useIsFocused } from 'expo-router'
import hexToRgba from 'hex-to-rgba'
import { LogOut } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import {
  Button,
  GlassContainer,
  GlassView,
  MenuItem,
  Screen,
  ViewLayout
} from '@/components/ui'

import { Toolbar } from '@/components/elements'
import {
  ACCOUNT_MENU,
  AccountUserInfo,
  TasteInsight
} from '@/components/screens/account'

import { useProtectedPush, useSpaces } from '@/hooks'

import { clearTokens, getRefreshToken } from '@/lib'

export default function Account() {
  const isFocused = useIsFocused()
  const protectedPush = useProtectedPush()

  const { tabbarSpace } = useSpaces()

  const queryClient = useQueryClient()
  const { data, isPending: isLoading, isError } = useCurrentUser()

  const { mutate: logout, isPending } = useMobileLogout({
    mutation: {
      onSettled: async () => {
        await queryClient.cancelQueries()

        await clearTokens()

        // Return to Home (For You) and clear router history
        if (router.canDismiss()) {
          router.dismissAll()
        }

        router.replace('/')

        await queryClient.resetQueries()
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
    <Screen>
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
      <ViewLayout.Root withToolbar>
        <View style={styles.root}>
          <ViewLayout.Root
            isAdaptive
            style={styles.content}
          >
            {/*{__DEV__ && <TokenDebug />}*/}

            <AccountUserInfo data={data?.data} />

            <TasteInsight />

            {/* TODO: add ScrollView for menu */}
            <GlassContainer>
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
                    onPress={() => protectedPush(item.path)}
                  >
                    {item.content && (
                      <Text style={menuStyles.premium}>{item.content}</Text>
                    )}
                  </MenuItem>
                ))}
              </GlassView>
            </GlassContainer>
          </ViewLayout.Root>
        </View>
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
    alignSelf: 'stretch',
    gap: SPACINGS[6],
    paddingHorizontal: LAYOUT['space-horizontal']
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
