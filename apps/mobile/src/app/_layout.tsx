import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { isRunningInExpoGo } from 'expo'
import { DarkTheme, ThemeProvider } from 'expo-router/react-navigation'
import { StatusBar } from 'expo-status-bar'
import { Suspense, lazy } from 'react'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import '@/lib/api'

import { RootRouter } from '@/routes'

export const unstable_settings = {
  anchor: '(tabbar)'
}

const NativePushNotifications = lazy(
  () => import('@/routes/NativePushNotifications')
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000 // 1 minute
    }
  }
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <ThemeProvider value={DarkTheme}>
            <StatusBar style='light' />
            <RootRouter />

            {!isRunningInExpoGo() && (
              <Suspense fallback={null}>
                <NativePushNotifications />
              </Suspense>
            )}
          </ThemeProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  )
}
