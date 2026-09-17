import { COLORS } from '@app/tokens'
import type { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import {
  type Edge,
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context'

interface Props extends PropsWithChildren {
  edges?: Edge[]
}

export function Screen({ edges = ['left', 'right'], children }: Props) {
  const inset = useSafeAreaInsets()

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.root, { marginTop: -inset.top }]}
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
