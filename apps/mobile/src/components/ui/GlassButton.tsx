import { COLORS, RADIUS, SPACINGS } from '@app/tokens'
import { type GlassViewProps } from 'expo-glass-effect'
import hexToRgba from 'hex-to-rgba'
import { type PropsWithChildren } from 'react'
import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  type ViewStyle
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { isGlassEffectAvailable } from '@/utils/is-glass-effect-available'

import { GlassView } from './GlassView'

interface GlassButtonProps
  extends
    PropsWithChildren,
    GlassViewProps,
    Omit<PressableProps, 'children' | 'style'> {
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const DISABLED_OPACITY = 0.4

export function GlassButton({
  children,
  tintColor = COLORS.primary,
  disabled,
  style,
  containerStyle,
  onPressIn,
  onPressOut,
  ...props
}: GlassButtonProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(disabled ? DISABLED_OPACITY : 1)

  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }))

  const handlePressIn = (event: GestureResponderEvent) => {
    scale.set(withSpring(0.9))
    opacity.set(withSpring(0.7))
    onPressIn?.(event)
  }

  const handlePressOut = (event: GestureResponderEvent) => {
    scale.set(withSpring(1))
    opacity.set(withSpring(disabled ? DISABLED_OPACITY : 1))
    onPressOut?.(event)
  }

  if (!isGlassEffectAvailable()) {
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          {
            backgroundColor: disabled
              ? hexToRgba(tintColor as string, 0.3)
              : tintColor
          },
          styles.buttonContainer,
          styles.button,
          style,
          containerStyle,
          disabled && styles.disabled,
          animated
        ]}
        {...props}
      >
        {children}
      </AnimatedPressable>
    )
  }

  return (
    <GlassView
      glassEffectStyle='clear'
      colorScheme='dark'
      isInteractive={!disabled}
      tintColor={disabled ? hexToRgba(tintColor as string, 0.3) : tintColor}
      style={[
        styles.buttonContainer,
        containerStyle,
        disabled && styles.disabled
      ]}
    >
      <Pressable
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, style]}
        {...props}
      >
        {children}
      </Pressable>
    </GlassView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: RADIUS.full
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACINGS[2]
  },
  disabled: {
    opacity: DISABLED_OPACITY
  }
})
