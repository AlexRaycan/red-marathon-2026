import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { BlurView } from 'expo-blur'
import type { PropsWithChildren, ReactNode } from 'react'
import {
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle
} from 'react-native'
import Animated, {
  type SharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { LeftActionButton } from './ToolbarButton'

interface Props extends PropsWithChildren {
  scrollY?: SharedValue<number>
  leftSide?: ReactNode | string
  rightSide?: ReactNode
  isBackButton?: boolean
  isCloseButton?: boolean
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export function Toolbar({
  scrollY,
  leftSide,
  rightSide,
  isBackButton,
  isCloseButton,
  style,
  children,
  onPress
}: Props) {
  const insets = useSafeAreaInsets()

  const blurStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY?.get() ?? 0, [0, 100], [0, 1], 'clamp')
  }))

  return (
    <View
      style={[styles.root, style]}
      pointerEvents='box-none'
    >
      <Animated.View
        pointerEvents='box-none'
        style={[StyleSheet.absoluteFill, blurStyle]}
      >
        <BlurView
          intensity={80}
          tint='systemChromeMaterialDark'
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.overlay} />
      </Animated.View>
      <View
        style={[
          styles.contentWrapper,
          {
            paddingTop: insets.top * 2
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
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    paddingBottom: LAYOUT['space-horizontal'],
    overflow: 'hidden'
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT['space-horizontal'],
    gap: SPACINGS[2]
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
