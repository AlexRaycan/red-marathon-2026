import { COLORS, SPACINGS } from '@app/tokens'
import type { PropsWithChildren } from 'react'
import { Platform, StyleSheet } from 'react-native'
import {
  type Edge,
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context'

const currentPlatform = Platform.OS

interface Props extends PropsWithChildren {
  edges?: Edge[]
}

export function Screen({ edges = ['left', 'right'], children }: Props) {
  const inset = useSafeAreaInsets()
  const marginTop =
    currentPlatform === 'ios' ? -inset.top : -inset.top + SPACINGS[4]

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.root, { marginTop }]}
    >
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg.base
  }
})
