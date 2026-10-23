import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import type { TButtonSize, TButtonVariant } from '@app/types'
import type { GlassViewProps } from 'expo-glass-effect'
import type { LucideIcon } from 'lucide-react-native'
import type { ReactNode } from 'react'
import {
  type ColorValue,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle
} from 'react-native'

import { HAPTIC_TRIGGERS, type HapticTrigger } from '@/lib'

import { isGlassEffectAvailable } from '@/utils'

import { GlassButton } from './GlassButton'

const _CONTENT_TYPES = {
  CONTENT: 'content',
  MAIN_CONTENT: 'mainContent'
} as const

type TContentTypes = (typeof _CONTENT_TYPES)[keyof typeof _CONTENT_TYPES]

type TContentStyle = Partial<Record<TContentTypes, StyleProp<ViewStyle>>>

interface Props
  extends GlassViewProps, Omit<PressableProps, 'children' | 'style'> {
  label?: string
  suffics?: ReactNode
  variant?: TButtonVariant
  size?: TButtonSize
  icon?: LucideIcon
  withFillIcon?: boolean
  strokeWidth?: number
  disabled?: boolean
  fullWidth?: boolean
  hapticStyle?: HapticTrigger
  contentColor?: ColorValue
  style?: StyleProp<ViewStyle>
  contentStyle?: TContentStyle
  onPress?: () => void
}

// TODO: Add `clear` variatn: it's like transparent,
// but with fallback color for android
const CONTENT_COLOR: Record<TButtonVariant, string> = {
  primary: COLORS.text.secondary,
  secondary: COLORS.text.primary,
  transparent: COLORS.text.primary
}

const ICON_SIZE: Record<TButtonSize, number> = {
  md: 18,
  lg: 20
}

export function Button({
  label,
  suffics,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  withFillIcon = false,
  strokeWidth,
  tintColor,
  contentColor: customContentColor,
  disabled,
  fullWidth = false,
  hapticStyle,
  style,
  contentStyle,
  children,
  onPress,
  ...rest
}: Props) {
  const isIconOnly = !children && (!label || label.length === 0) && !!Icon

  const hasGlassEffect = isGlassEffectAvailable()

  const fallbackContentColor = hasGlassEffect
    ? COLORS.text.primary
    : tintColor
      ? COLORS.text.primary
      : CONTENT_COLOR[variant]
  const contentColor = hasGlassEffect
    ? COLORS.text.primary
    : fallbackContentColor

  // tintColor принимать извне, тут только отрабатываем его отсуствие
  const fallbackTintColor = {
    primary: hasGlassEffect ? 'rgba(255, 255, 255, 0.24)' : COLORS.primary,
    secondary: hasGlassEffect ? 'rgba(255, 255, 255, 0.08)' : COLORS.bg.card
  }
  const buttonTintColor: Record<TButtonVariant, ColorValue | undefined> = {
    primary: tintColor ?? fallbackTintColor.primary,
    secondary: tintColor ?? fallbackTintColor.secondary,
    transparent: undefined
  }

  const hapticTrigger = hapticStyle
    ? HAPTIC_TRIGGERS[hapticStyle]
    : variant === 'primary'
      ? HAPTIC_TRIGGERS.impact
      : HAPTIC_TRIGGERS.selection

  const handlePress = () => {
    if (variant === 'primary') {
      void hapticTrigger?.('Heavy')
    } else {
      void hapticTrigger?.()
    }

    onPress?.()
  }

  return (
    <GlassButton
      onPress={handlePress}
      disabled={disabled}
      tintColor={tintColor ?? buttonTintColor[variant]}
      containerStyle={fullWidth && styles.fullWidth}
      style={[
        sizeStyles[size],
        isIconOnly && [styles.iconOnly, iconOnlySizes[size]],
        style,
        fullWidth && styles.fullWidth
      ]}
      {...rest}
    >
      <View style={[styles.content, contentStyle?.content]}>
        <View style={[styles.mainContent, contentStyle?.mainContent]}>
          {Icon && (
            <Icon
              size={!isIconOnly ? ICON_SIZE[size] : ICON_SIZE[size] + 4}
              color={customContentColor ?? contentColor}
              {...(withFillIcon && {
                fill: customContentColor ?? contentColor
              })}
              {...(strokeWidth && {
                strokeWidth: strokeWidth
              })}
            />
          )}
          {label && (
            <Text
              style={[
                styles.label,
                labelSizes[size],
                { color: customContentColor ?? contentColor }
              ]}
            >
              {label}
            </Text>
          )}
          {suffics}
        </View>
        {children}
      </View>
    </GlassButton>
  )
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
    flexShrink: 1,
    minWidth: 0
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACINGS[2]
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACINGS[2]
  },
  iconOnly: {
    paddingHorizontal: 0,
    aspectRatio: 1
  },
  label: {
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary
  }
})

const sizeStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  md: {
    height: 44,
    paddingHorizontal: SPACINGS[5]
  },
  // eslint-disable-next-line react-native/no-unused-styles
  lg: {
    height: 56,
    paddingHorizontal: SPACINGS[6]
  }
})

const iconOnlySizes = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  md: {
    width: 44
  },
  // eslint-disable-next-line react-native/no-unused-styles
  lg: {
    width: 56
  }
})

const labelSizes = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  md: {
    fontSize: FONT_SIZE.sm
  },
  // eslint-disable-next-line react-native/no-unused-styles
  lg: {
    fontSize: FONT_SIZE.base
  }
})
