import { Stack } from 'expo-router'
import {
  DarkTheme,
  SafeAreaProviderCompat,
  ThemeProvider
} from 'expo-router/build/react-navigation'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <SafeAreaProviderCompat>
      <ThemeProvider value={DarkTheme}>
        <StatusBar style='light' />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </SafeAreaProviderCompat>
  )
}
