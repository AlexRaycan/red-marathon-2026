import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import {
  type ColorValue,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  Text,
  type TextProps,
  type TextStyle
} from 'react-native'

import { AnimatedPressable } from './AnimatedPressable'

interface LinkButtonProps
  extends Omit<PressableProps, 'children'>, Pick<TextProps, 'children'> {
  textStyles?: StyleProp<TextStyle>
  isDestructive?: boolean
}

function LinkButton({
  isDestructive,
  textStyles,
  children,
  style,
  ...props
}: LinkButtonProps) {
  return (
    <AnimatedPressable
      style={[styles.root, { ...style }]}
      {...props}
    >
      <Text
        style={[styles.label, isDestructive && styles.destructive, textStyles]}
      >
        {children}
      </Text>
    </AnimatedPressable>
  )
}

interface LinkTextProps extends TextProps {
  color?: ColorValue
  isDistracted?: boolean
}

function LinkText({
  color,
  isDistracted,
  children,
  style,
  ...props
}: LinkTextProps) {
  return (
    <Text
      style={[styles.link, isDistracted && styles.destructive, style]}
      {...props}
    >
      {children}
    </Text>
  )
}

export const Link = {
  Button: LinkButton,
  Text: LinkText
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: SPACINGS[2],
    opacity: 1
  },
  label: {
    color: COLORS.text.primary,
    textAlign: 'center',
    fontSize: FONT_SIZE.sm
  },
  link: {
    fontWeight: FONT_WEIGHT.semibold,
    textDecorationLine: 'underline'
  },
  destructive: {
    color: COLORS.status.error
  }
})
