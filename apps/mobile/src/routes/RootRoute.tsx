import { useAuth } from '@app/hooks'
import { type Href, Stack, usePathname } from 'expo-router'
import { useEffect } from 'react'

import { useOnboardingInit } from '@/hooks'

import { useOnboardingStore } from '@/store'

export function RootRouter() {
  useOnboardingInit()

  const { isAuthenticated } = useAuth()

  const pathname = usePathname() as Href

  const resetRedirectToOnboarding = useOnboardingStore(
    state => state.resetRedirectTo
  )

  const isOnboardingCompleted = useOnboardingStore(state => state.isCompleted)
  const redirectToOnBoarding = useOnboardingStore(
    state => state.completionRedirectTo
  )

  useEffect(() => {
    if (pathname !== '/onboarding' && redirectToOnBoarding !== '/') {
      void resetRedirectToOnboarding()
    }
  }, [pathname, redirectToOnBoarding, resetRedirectToOnboarding])

  if (isOnboardingCompleted === null) return null

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Protected
        guard={isOnboardingCompleted}
        redirectTo='/onboarding'
      >
        <Stack.Screen name='(tabbar)' />

        <Stack.Screen name='(auth)' />

        <Stack.Protected
          guard={isAuthenticated}
          redirectTo='/login'
        >
          <Stack.Screen name='collections' />
          <Stack.Screen name='collections/[id]' />

          <Stack.Screen
            name='subscriptions'
            options={{ presentation: 'fullScreenModal' }}
          />

          <Stack.Screen name='notifications' />
        </Stack.Protected>
      </Stack.Protected>

      <Stack.Protected
        guard={!isOnboardingCompleted}
        redirectTo={redirectToOnBoarding}
      >
        <Stack.Screen name='onboarding' />
      </Stack.Protected>
    </Stack>
  )
}
