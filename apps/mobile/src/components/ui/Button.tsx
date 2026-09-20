import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import type { TButtonSize, TButtonVariant } from '@app/types'
import type { LucideIcon } from 'lucide-react-native'
import { type PropsWithChildren, useState } from 'react'
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  type ViewStyle
} from 'react-native'

import { GlassButton } from './GlassButton'

interface Props extends PropsWithChildren {
  label?: string
  variant?: TButtonVariant
  size?: TButtonSize
  icon?: LucideIcon
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

const CONTENT_COLOR: Record<TButtonVariant, string> = {
  primary: COLORS.text.primary,
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
  style,
  disabled,
  children,
  onPress
}: Props) {
  const [isPressed, setIsPressed] = useState(false)

  const isIconOnly = !children && (!label || label.length === 0) && !!Icon
  const contentColor = CONTENT_COLOR[variant]

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.root]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <GlassButton
        style={[
          style,
          sizeStyles[size],
          variantSyles[variant],
          isIconOnly && [styles.iconOnly, iconOnlySizes[size]],
          isPressed && styles.pressed,
          disabled && styles.disabled
        ]}
      >
        {Icon && (
          <Icon
            size={!isIconOnly ? ICON_SIZE[size] : ICON_SIZE[size] + 4}
            color={contentColor}
          />
        )}
        {label && (
          <Text
            style={[styles.label, labelSizes[size], { color: contentColor }]}
          >
            {label}
          </Text>
        )}
        {children}
      </GlassButton>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {},
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
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary
  }
})

const variantSyles = StyleSheet.create({
  primary: {},
  secondary: {
    backgroundColor: 'transparent'
  },
  transparent: {
    backgroundColor: 'transparent'
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
