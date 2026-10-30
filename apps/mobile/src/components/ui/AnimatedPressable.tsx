import { SPACINGS } from '@app/tokens'
import { type PressableProps, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import type { HapticTrigger } from '@/lib'

import { Pressable } from './Pressable'

const AnimatedPressableCore = Animated.createAnimatedComponent(Pressable)

interface AnimatedPressableProps extends PressableProps {
  hapticStyle?: HapticTrigger
  withScale?: boolean
}

export function AnimatedPressable({
  withScale = true,
  onPress,
  onPressIn,
  onPressOut,
  style,
  children,
  ...props
}: AnimatedPressableProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const animated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    ...(withScale && { transform: [{ scale: scale.value }] })
  }))

  const handlePressIn = () => {
    scale.set(withSpring(0.95))
    opacity.set(withSpring(0.7))
  }
  const handlePressOut = () => {
    scale.set(withSpring(1))
    opacity.set(withSpring(1))
  }

  return (
    <AnimatedPressableCore
      hitSlop={12}
      style={[styles.root, animated, style]}
      onPress={onPress}
      onPressIn={e => {
        handlePressIn()
        onPressIn?.(e)
      }}
      onPressOut={e => {
        handlePressOut()
        onPressOut?.(e)
      }}
      {...props}
    >
      {children}
    </AnimatedPressableCore>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    gap: SPACINGS[1]
  }
})
