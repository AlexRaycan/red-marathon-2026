import { RADIUS, SPACINGS } from '@app/tokens'
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect'
import type { PropsWithChildren } from 'react'
import { type StyleProp, StyleSheet, View } from 'react-native'
import type { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

interface GlassButtonProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>
}

export function GlassButton({ children, style }: GlassButtonProps) {
  if (!isGlassEffectAPIAvailable()) {
    return <View style={[style, styles.button]}>{children}</View>
  }

  return (
    <GlassView
      glassEffectStyle='clear'
      style={[style, styles.button]}
    >
      {children}
    </GlassView>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACINGS[2],
    overflow: 'hidden',
    borderRadius: RADIUS.full
  }
})
