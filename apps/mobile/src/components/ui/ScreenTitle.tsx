import { COLORS, FONT_SIZE, FONT_WEIGHT } from '@app/tokens'
import { StyleSheet, Text, type TextProps } from 'react-native'

interface Props extends TextProps {
  fontSize?: number
}

export function ScreenTitle({
  fontSize = FONT_SIZE['1.5xl'],
  children,
  style,
  ...rest
}: Props) {
  return (
    <Text
      style={[styles.title, { fontSize }, style]}
      {...rest}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.text.primary,
    fontWeight: FONT_WEIGHT.bold
  }
})
