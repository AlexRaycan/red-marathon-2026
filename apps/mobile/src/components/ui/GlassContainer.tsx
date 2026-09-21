import {
  GlassContainer as ExpoGlassContainer,
  type GlassContainerProps
} from 'expo-glass-effect'
import { View, type ViewProps } from 'react-native'

import { isGlassEffectAvailable } from '@/utils/is-glass-effect-available'

interface Props extends GlassContainerProps, ViewProps {}

export function GlassContainer({
  children,
  spacing = 10,
  style,
  ...props
}: Props) {
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
