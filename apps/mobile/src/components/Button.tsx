import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACINGS } from '@app/tokens'
import type { TButtonSize, TButtonVariant } from '@app/types'
import type { LucideIcon } from 'lucide-react-native'
import type { PropsWithChildren } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface Props extends PropsWithChildren {
  variant?: TButtonVariant
  size?: TButtonSize
  icon?: LucideIcon
  disabled?: boolean
  onPress?: () => void
}

const CONTENT_COLOR: Record<TButtonVariant, string> = {
  primary: COLORS.text.secondary,
  secondary: COLORS.text.primary
}

const ICON_SIZE: Record<TButtonSize, number> = {
  md: 18,
  lg: 20
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled,
  onPress
}: Props) {
  const isIconOnly = !children && !!Icon
  const contentColor = CONTENT_COLOR[variant]

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.root,
        variantSyles[variant],
        sizeStyles[size],
        isIconOnly && [styles.iconOnly, iconOnlySizes[size]],
        pressed && styles.pressed,
        disabled && styles.disabled
      ]}
    >
      {Icon && (
        <Icon
          size={ICON_SIZE[size]}
          color={contentColor}
        />
      )}
      {children && (
        <Text style={[styles.label, labelSizes[size], { color: contentColor }]}>
          {children}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACINGS[2],
    borderRadius: RADIUS.full
  },
  iconOnly: {
    paddingHorizontal: 0,
    aspectRatio: 1
  },
  pressed: {
    opacity: 0.7
  },
  disabled: {
    opacity: 0.4
  },
  label: {
    fontWeight: FONT_WEIGHT.semibold
  }
})

const variantSyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.primary
  },
  secondary: {
    backgroundColor: COLORS.bg.card
  }
})

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
