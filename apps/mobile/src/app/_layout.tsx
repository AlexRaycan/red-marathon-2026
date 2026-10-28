import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DarkTheme, ThemeProvider } from 'expo-router/react-navigation'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import '@/lib/api'

import { RootRouter } from '@/routes'

export const unstable_settings = {
  anchor: '(tabbar)'
}

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
      <SafeAreaProvider>
        <ThemeProvider value={DarkTheme}>
          <StatusBar style='light' />
          <RootRouter />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
