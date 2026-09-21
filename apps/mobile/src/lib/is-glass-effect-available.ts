import { isGlassEffectAPIAvailable } from 'expo-glass-effect'
import { Platform } from 'react-native'

export const isGlassEffectAvailable = () => {
  return Platform.OS === 'ios' && isGlassEffectAPIAvailable()
}
