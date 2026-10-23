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
  placement?: 'left' | 'right'
  tintColor?: ColorValue
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export function FloatingButton({
  icon: Icon,
  placement = 'left',
  style,
  ...props
}: FloatingButtonProps) {
  const inset = useSafeAreaInsets()
  const position = placement === 'left' ? styles.left : styles.right

  return (
    <View
      pointerEvents='box-none'
      style={[
        {
          position: 'absolute',
          bottom: inset.bottom
        },
        position,
        style
      ]}
    >
      <Button
        icon={Icon}
        size='lg'
        variant='transparent'
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
