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
      <Stack.Protected guard={!isCompleted}>
        <Stack.Screen name='onboarding' />
      </Stack.Protected>

      <Stack.Protected guard={isCompleted}>
        <Stack.Screen name='(tabbar)' />
        <Stack.Screen
          name='plans'
          options={{ presentation: 'fullScreenModal' }}
        />
      </Stack.Protected>
    </Stack>
  )
}
