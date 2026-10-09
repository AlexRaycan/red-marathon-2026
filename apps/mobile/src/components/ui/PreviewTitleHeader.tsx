import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import type { PropsWithChildren } from 'react'
import { Text } from 'react-native'
import { type StyleProp, StyleSheet, type TextStyle, View } from 'react-native'

interface PreviewTitleHeaderProps extends PropsWithChildren {
  text: string
  style?: StyleProp<TextStyle>
}

export function PreviewTitleHeader({
  text,
  style,
  children
}: PreviewTitleHeaderProps) {
  return (
    <View style={styles.root}>
      {children}
      <Text
        style={[styles.title, style]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[2]
  },
  title: {
    flexShrink: 1,
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold
  }
})
