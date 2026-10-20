import { SPACINGS } from '@app/tokens'
import { Pressable, type PressableProps, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { HAPTIC_TRIGGERS } from '@/lib'

const AnimatedPressableCore = Animated.createAnimatedComponent(Pressable)

export function AnimatedPressable({
  onPress,
  style,
  children,
  ...props
}: PressableProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const animated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }))

  const handlePressIn = () => {
    scale.set(withSpring(0.95))
    opacity.set(withSpring(0.7))
    void HAPTIC_TRIGGERS.selection()
  }
  const handlePressOut = () => {
    scale.set(withSpring(1))
    opacity.set(withSpring(1))
  }

  return (
    <AnimatedPressableCore
      hitSlop={12}
      style={[styles.root, style, animated]}
      onPress={e => {
        void HAPTIC_TRIGGERS.impact('Soft')
        onPress?.(e)
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
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
