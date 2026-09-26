import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { BlurView } from 'expo-blur'
import type { ReactNode } from 'react'
import {
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewProps,
  type ViewStyle
} from 'react-native'
import Animated, {
  type SharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ToolbarActionButton } from './ToolbarActionButton'

interface Props extends ViewProps {
  scrollY?: SharedValue<number>
  leftSide?: ReactNode | string
  rightSide?: ReactNode
  isBackButton?: boolean
  isCloseButton?: boolean
  withBlur?: boolean
  isAbsolute?: boolean
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export function Toolbar({
  scrollY,
  leftSide,
  rightSide,
  isBackButton,
  isCloseButton,
  withBlur,
  isAbsolute,
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
      style={[
        styles.root,
        style,
        isAbsolute && [
          StyleSheet.absoluteFill,
          {
            paddingTop: insets.top * 2,
            paddingHorizontal: LAYOUT['space-horizontal']
          }
        ]
      ]}
      pointerEvents='box-none'
    >
      {withBlur && (
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
      )}

      <View style={[styles.contentWrapper]}>
        <View style={[styles.content, styles.leftContent]}>
          <ToolbarActionButton
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
    zIndex: 10,
    paddingBottom: LAYOUT['space-vertical'],
    overflow: 'hidden'
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
  },
  contentWrapper: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    textAlign: 'center',
    fontSize: FONT_SIZE['1.5xl'],
    fontWeight: FONT_WEIGHT.bold
  }
})
