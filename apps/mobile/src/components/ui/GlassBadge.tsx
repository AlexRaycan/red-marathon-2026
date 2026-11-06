import { RADIUS } from '@app/tokens'
import type { PropsWithChildren } from 'react'
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native'

import { GlassView } from './GlassView'

interface Props extends PropsWithChildren {
  accentColor?: string
  size?: number
  style?: StyleProp<ViewStyle>
}

const SIZE = 26

export function GlassBadge({
  accentColor = 'transparent',
  size = SIZE,
  style,
  children
}: Props) {
  return (
    <GlassView
      glassEffectStyle='clear'
      tintColor={accentColor}
      style={[styles.glass, { width: size, height: size }, style]}
    >
      {children}
    </GlassView>
  )
}

const styles = StyleSheet.create({
  glass: {
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }
})
