import { COLORS, SPACINGS } from '@app/tokens'
import type { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props extends PropsWithChildren {
  edges?: ('top' | 'bottom' | 'left' | 'right')[]
}

export function Screen({ edges = ['top'], children }: Props) {
  return (
    <SafeAreaView
      edges={edges}
      style={styles.root}
    >
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg.base,
    paddingHorizontal: SPACINGS[6]
  }
})
