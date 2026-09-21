import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import type { TButtonSize, TButtonVariant } from '@app/types'
import type { GlassViewProps } from 'expo-glass-effect'
import type { LucideIcon } from 'lucide-react-native'
import { type PropsWithChildren } from 'react'
import {
  type ColorValue,
  type StyleProp,
  StyleSheet,
  Text,
  type ViewStyle
} from 'react-native'

import { GlassButton } from './GlassButton'
import { isGlassEffectAvailable } from '@/lib/is-glass-effect-available'

interface Props extends PropsWithChildren, GlassViewProps {
  label?: string
  variant?: TButtonVariant
  size?: TButtonSize
  icon?: LucideIcon
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

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
  variant = 'primary',
  size = 'md',
  icon: Icon,
  tintColor,
  style,
  disabled,
  children,
  onPress
}: Props) {
  const isIconOnly = !children && (!label || label.length === 0) && !!Icon

  const hasGlassEffect = isGlassEffectAvailable()

  const contentColor = hasGlassEffect
    ? COLORS.text.primary
    : tintColor
      ? COLORS.text.primary
      : CONTENT_COLOR[variant]

  const buttonTintColor: Record<TButtonVariant, ColorValue> = {
    primary:
      tintColor ??
      (hasGlassEffect ? 'rgba(255, 255, 255, 0.3)' : COLORS.primary),
    secondary: hasGlassEffect ? '' : COLORS.bg.card,
    transparent: 'transparent'
  }

  // const buttonTintColor =
  //   variant === 'primary' ? tintColor : 'rgba(255, 255, 255, 0.8)'

  return (
    <GlassButton
      onPress={onPress}
      disabled={disabled}
      tintColor={buttonTintColor[variant]}
      style={[
        style,
        sizeStyles[size],
        // variantSyles[variant],
        isIconOnly && [styles.iconOnly, iconOnlySizes[size]]
      ]}
    >
      {Icon && (
        <Icon
          size={!isIconOnly ? ICON_SIZE[size] : ICON_SIZE[size] + 4}
          color={contentColor}
        />
      )}
      {label && (
        <Text style={[styles.label, labelSizes[size], { color: contentColor }]}>
          {label}
        </Text>
      )}
      {children}
    </GlassButton>
  )
}

const styles = StyleSheet.create({
  root: {},
  iconOnly: {
    paddingHorizontal: 0,
    aspectRatio: 1
  },
  label: {
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary
  }
})

/* const variantSyles = StyleSheet.create({
  secondary: {
    backgroundColor: 'transparent'
  }
}) */

const sizeStyles = StyleSheet.create({
  md: {
    height: 44,
    paddingHorizontal: SPACINGS[5]
  },
  lg: {
    height: 56,
    paddingHorizontal: SPACINGS[6]
  }
})

const iconOnlySizes = StyleSheet.create({
  md: {
    width: 44
  },
  lg: {
    width: 56
  }
})

const labelSizes = StyleSheet.create({
  md: {
    fontSize: FONT_SIZE.sm
  },
  lg: {
    fontSize: FONT_SIZE.base
  }
})
