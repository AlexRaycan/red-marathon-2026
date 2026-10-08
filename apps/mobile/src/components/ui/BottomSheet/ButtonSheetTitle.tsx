import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import { StyleSheet, View } from 'react-native'

import { ScreenTitle } from '../ScreenTitle'

interface ButtonSheetTitleProps {
  title?: string
}

export function ButtonSheetTitle({ title }: ButtonSheetTitleProps) {
  return (
    <View style={[styles.title]}>
      <ScreenTitle style={[styles.inset]}>{title}</ScreenTitle>
      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  inset: {
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  title: {
    paddingTop: SPACINGS[2],
    paddingBottom: StyleSheet.hairlineWidth,
    gap: SPACINGS[4]
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border
  }
})
