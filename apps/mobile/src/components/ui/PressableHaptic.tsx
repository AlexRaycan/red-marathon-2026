import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps
} from 'react-native'

import { HAPTIC_TRIGGERS, type HapticTrigger } from '@/lib'

interface PressableHapticProps extends PressableProps {
  hapticStyle?: HapticTrigger
}

export function PressableHaptic({
  hapticStyle,
  onPress,
  onPressIn,
  children,
  ...props
}: PressableHapticProps) {
  const hapticOnPressTrigger = hapticStyle
    ? HAPTIC_TRIGGERS[hapticStyle]
    : HAPTIC_TRIGGERS.impact

  const handlePress = (event: GestureResponderEvent) => {
    if (hapticStyle) {
      void hapticOnPressTrigger()
    } else {
      void hapticOnPressTrigger('Soft')
    }

    onPress?.(event)
  }

  const handlePressIn = (event: GestureResponderEvent) => {
    void HAPTIC_TRIGGERS.selection()

    onPressIn?.(event)
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      {...props}
    >
      {children}
    </Pressable>
  )
}
