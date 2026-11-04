import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

import { ScreenTitle } from '../ScreenTitle'

interface BottomSheetTitleProps {
  title?: string
  action?: ReactNode
}

export function BottomSheetTitle({ title, action }: BottomSheetTitleProps) {
  return (
    <View style={[styles.title]}>
      <View style={styles.header}>
        <ScreenTitle style={[styles.inset]}>{title}</ScreenTitle>

        <View style={styles.inset}>{action}</View>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border
  }
})
