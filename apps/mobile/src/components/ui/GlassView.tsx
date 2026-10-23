import {
  GlassView as ExpoGlassView,
  type GlassViewProps
} from 'expo-glass-effect'
import { View } from 'react-native'

import { isGlassEffectAvailable } from '@/utils'

export function GlassView({ tintColor, children, ...props }: GlassViewProps) {
  if (!isGlassEffectAvailable()) return <View {...props}>{children}</View>

  return (
    <ExpoGlassView
      glassEffectStyle={tintColor ? 'clear' : 'regular'}
      colorScheme='dark'
      tintColor={tintColor}
      {...props}
    >
      {children}
    </ExpoGlassView>
  )
}
