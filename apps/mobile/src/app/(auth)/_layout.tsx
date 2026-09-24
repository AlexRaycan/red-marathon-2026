import { Stack } from 'expo-router'

export default function AuthLayout() {
  // TODO: заяюзать keyboard controller?
  // Advanced keyboard handling with Keyboard Controller
  // https://docs.expo.dev/guides/keyboard-handling/#advanced-keyboard-handling-with-keyboard-controller
  return <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
}
