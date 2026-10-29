import { Stack } from 'expo-router'

import { useOnboardingInit } from '@/hooks'

import { useOnboardingStore } from '@/store'

export function RootRouter() {
  useOnboardingInit()

  const isOnboardingCompleted = useOnboardingStore(state => state.isCompleted)

  if (isOnboardingCompleted === null) return null

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Protected
        guard={!isOnboardingCompleted}
        redirectTo='/'
      >
        <Stack.Screen name='onboarding' />
      </Stack.Protected>

      <Stack.Protected
        guard={isOnboardingCompleted}
        redirectTo='/onboarding'
      >
        <Stack.Screen name='(tabbar)' />
        <Stack.Screen name='collections' />
        <Stack.Screen name='collections/[id]' />

        <Stack.Screen name='(auth)' />

        <Stack.Screen
          name='subscriptions'
          options={{ presentation: 'fullScreenModal' }}
        />

        {/* <Stack.Screen
          name='collection-create'
          options={{ presentation: 'fullScreenModal' }}
        />

        <Stack.Screen
          name='add-to-collection/[key]'
          options={{ presentation: 'fullScreenModal' }}
        /> */}
      </Stack.Protected>
    </Stack>
  )
}
