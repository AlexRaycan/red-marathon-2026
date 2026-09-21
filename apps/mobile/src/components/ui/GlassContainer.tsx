import {
  GlassContainer as ExpoGlassContainer,
  type GlassContainerProps
} from 'expo-glass-effect'
import { View, type ViewProps } from 'react-native'

import { isGlassEffectAvailable } from '@/lib/is-glass-effect-available'

interface Props extends GlassContainerProps, ViewProps {}

export function GlassContainer({ children, spacing, style, ...props }: Props) {
  if (!isGlassEffectAvailable()) {
    return (
      <View
        style={style}
        {...props}
      >
        {children}
      </View>
    )
  }

  return (
    <ExpoGlassContainer
      spacing={spacing}
      style={[
        style,
        {
          padding: 20,
          margin: -20
        }
      ]}
      {...props}
    >
      {children}
    </ExpoGlassContainer>
  )
}
