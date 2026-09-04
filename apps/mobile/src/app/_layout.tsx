import { Stack } from 'expo-router'
import { SafeAreaProviderCompat } from 'expo-router/build/react-navigation'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <SafeAreaProviderCompat>
      <StatusBar style='light' />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProviderCompat>
  )
}
