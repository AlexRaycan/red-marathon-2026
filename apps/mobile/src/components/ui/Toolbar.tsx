import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import type { PropsWithChildren, ReactNode } from 'react'
import {
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { LeftActionButton } from './ToolbarButton'

interface Props extends PropsWithChildren {
  leftSide?: ReactNode | string
  rightSide?: ReactNode
  isBackButton?: boolean
  isCloseButton?: boolean
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export function Toolbar({
  leftSide,
  rightSide,
  isBackButton,
  isCloseButton,
  style,
  children,
  onPress
}: Props) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.root,
        style,
        {
          marginTop: insets.top * 2
        }
      ]}
    >
      <View style={[styles.content, styles.leftContent]}>
        <LeftActionButton
          isBackButton={isBackButton}
          isCloseButton={isCloseButton}
          onPress={onPress}
        />
        {typeof leftSide === 'string' ? (
          <Text style={styles.text}>{leftSide}</Text>
        ) : (
          leftSide
        )}
      </View>

      {children}

      <View style={[styles.content, styles.rightContent]}>{rightSide}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[2]
  },
  leftContent: {
    justifyContent: 'flex-start'
  },
  rightContent: {
    justifyContent: 'flex-end'
  },
  text: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['2xl'],
    fontWeight: FONT_WEIGHT.bold
  }
})
