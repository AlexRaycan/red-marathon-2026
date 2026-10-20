import {
  type GestureResponderEvent,
  Pressable as NativePressable,
  type PressableProps as NativePressableProps
} from 'react-native'

import { HAPTIC_TRIGGERS, type HapticTrigger } from '@/lib'

interface PressableProps extends NativePressableProps {
  hapticStyle?: HapticTrigger
  withHaptic?: boolean
}

export function Pressable({
  hapticStyle,
  withHaptic = true,
  onPress,
  children,
  ...props
}: PressableProps) {
  const handlePress = (event: GestureResponderEvent) => {
    if (withHaptic) {
      if (hapticStyle) {
        void HAPTIC_TRIGGERS[hapticStyle]()
      } else {
        void HAPTIC_TRIGGERS.selection()
      }
    }

    onPress?.(event)
  }

  return (
    <NativePressable
      onPress={handlePress}
      {...props}
    >
      {children}
    </NativePressable>
  )
}
