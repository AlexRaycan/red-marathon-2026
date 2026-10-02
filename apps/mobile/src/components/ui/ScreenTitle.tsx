import { COLORS, FONT_SIZE, FONT_WEIGHT } from '@app/tokens'
import { StyleSheet, Text, type TextProps } from 'react-native'

export function ScreenTitle({ children, style, ...rest }: TextProps) {
  return (
    <Text
      style={[styles.title, style]}
      {...rest}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['1.5xl'],
    fontWeight: FONT_WEIGHT.bold
  }
})
