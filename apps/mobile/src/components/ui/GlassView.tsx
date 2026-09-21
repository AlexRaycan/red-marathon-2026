import {
  GlassView as ExpoGlassView,
  type GlassViewProps
} from 'expo-glass-effect'
import { View } from 'react-native'

import { isGlassEffectAvailable } from '@/utils/is-glass-effect-available'

export function GlassView({ children, ...props }: GlassViewProps) {
  if (!isGlassEffectAvailable()) return <View {...props}>{children}</View>

  return (
    <ExpoGlassView
      glassEffectStyle='clear'
      colorScheme='dark'
      {...props}
    >
      {children}
    </ExpoGlassView>
  )
}
