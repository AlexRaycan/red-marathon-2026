import { LAYOUT } from '@app/tokens'
import type { LucideIcon } from 'lucide-react-native'
import {
  type ColorValue,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from './Button'

interface FloatingButtonProps {
  icon: LucideIcon
  align?: 'left' | 'right'
  tintColor?: ColorValue
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export function FloatingButton({
  icon: Icon,
  align = 'left',
  style,
  ...props
}: FloatingButtonProps) {
  const inset = useSafeAreaInsets()

  return (
    <View
      pointerEvents='box-none'
      style={[
        {
          position: 'absolute',
          bottom: inset.bottom
        },
        styles[align],
        style
      ]}
    >
      <Button
        icon={Icon}
        size='lg'
        variant='secondary'
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  left: {
    left: LAYOUT['space-horizontal']
  },
  right: {
    right: LAYOUT['space-horizontal']
  }
})
