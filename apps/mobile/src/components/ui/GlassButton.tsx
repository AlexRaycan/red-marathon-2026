import { COLORS, RADIUS, SPACINGS } from '@app/tokens'
import { GlassView, type GlassViewProps } from 'expo-glass-effect'
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

interface GlassButtonProps
  extends
    PropsWithChildren,
    GlassViewProps,
    Omit<PressableProps, 'children' | 'style'> {
  style?: StyleProp<ViewStyle>
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const DISABLED_OPACITY = 0.4

export function GlassButton({
  children,
  tintColor,
  disabled,
  style,
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
          style,
          { backgroundColor: disabled ? COLORS.primary : tintColor },
          styles.buttonContainer,
          styles.button,
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
      tintColor={disabled ? undefined : tintColor}
      style={[styles.buttonContainer, disabled && styles.disabled]}
    >
      <Pressable
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[style, styles.button]}
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
