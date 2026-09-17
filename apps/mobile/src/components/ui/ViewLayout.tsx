import { LAYOUT } from '@app/tokens'
import type { PropsWithChildren } from 'react'
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native'

interface Props extends PropsWithChildren {
  style?: StyleProp<ViewStyle>
}

export function ViewLayout({ style, children }: Props) {
  return <View style={[style, styles.root]}>{children}</View>
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: LAYOUT['space-horizontal']
  }
})
