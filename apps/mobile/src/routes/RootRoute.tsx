import { Stack } from 'expo-router'

import { useOnboardingInit } from '@/hooks'

import { useOnboardingStore } from '@/store'

export function RootRouter() {
  useOnboardingInit()

  const isCompleted = useOnboardingStore(state => state.isCompleted)

  if (isCompleted === null) return null

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Protected
        guard={!isCompleted}
        redirectTo='/'
      >
        <Stack.Screen name='onboarding' />
      </Stack.Protected>

      <Stack.Protected
        guard={isCompleted}
        redirectTo='/onboarding'
      >
        <Stack.Screen name='(tabbar)' />
        <Stack.Screen name='(auth)' />

        <Stack.Screen
          name='subscriptions'
          options={{ presentation: 'fullScreenModal' }}
        />
      </Stack.Protected>
    </Stack>
  )
}
