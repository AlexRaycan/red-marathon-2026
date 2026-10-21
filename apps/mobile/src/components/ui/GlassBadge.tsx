import { RADIUS } from '@app/tokens'
import type { PropsWithChildren } from 'react'
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native'

import { GlassView } from './GlassView'

interface Props extends PropsWithChildren {
  accentColor?: string
  style?: StyleProp<ViewStyle>
}

const SIZE = 26

export function GlassBadge({
  accentColor = 'transparent',
  style,
  children
}: Props) {
  return (
    <GlassView
      glassEffectStyle='clear'
      tintColor={accentColor}
      style={[styles.glass, style]}
    >
      {children}
    </GlassView>
  )
}

const styles = StyleSheet.create({
  glass: {
    width: SIZE,
    height: SIZE,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }
})
