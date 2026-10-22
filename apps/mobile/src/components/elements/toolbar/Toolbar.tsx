import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import hexToRgba from 'hex-to-rgba'
import type { ReactNode } from 'react'
import {
  type StyleProp,
  StyleSheet,
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

import { ScreenTitle } from '@/components/ui'

import { ToolbarActionButton } from './ToolbarActionButton'

interface Props extends ViewProps {
  scrollY?: SharedValue<number>
  titleSize?: number
  leftSide?: ReactNode | string
  rightSide?: ReactNode
  isBackButton?: boolean
  isCloseButton?: boolean
  withBlur?: boolean
  withGradient?: boolean
  gradientLocations?: [number, number, ...number[]]
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export function Toolbar({
  scrollY,
  titleSize = FONT_SIZE['1.5xl'],
  leftSide,
  rightSide,
  isBackButton,
  isCloseButton,
  withBlur,
  withGradient,
  gradientLocations = [0.0, 0.5, 1],
  style,
  children,
  onPress
}: Props) {
  // TODO: refactor todo smth with padding top
  const insets = useSafeAreaInsets()
  const animationOverlay = withBlur ?? withGradient

  const blurStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY?.get() ?? 0, [0, 100], [0, 1], 'clamp')
  }))

  return (
    <View
      style={[styles.root, { paddingTop: insets.top * 2 }, style]}
      pointerEvents='box-none'
    >
      {animationOverlay && (
        <Animated.View
          pointerEvents='box-none'
          style={[StyleSheet.absoluteFill, blurStyle]}
        >
          {withBlur && (
            <>
              <BlurView
                intensity={80}
                tint='systemChromeMaterialDark'
                style={StyleSheet.absoluteFill}
              />

              <View style={styles.overlay} />
            </>
          )}

          {withGradient && (
            <LinearGradient
              colors={[
                COLORS.bg.base,
                hexToRgba(COLORS.bg.base, 0.7),
                'transparent'
              ]}
              locations={gradientLocations}
              style={StyleSheet.absoluteFill}
            />
          )}
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
            <ScreenTitle fontSize={titleSize}>{leftSide}</ScreenTitle>
          ) : (
            leftSide
          )}
        </View>

        <View style={[styles.content, styles.rightContent]}>{rightSide}</View>
      </View>

      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    zIndex: 10,
    paddingBottom: LAYOUT['space-vertical'],
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
  },
  contentWrapper: {
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
    fontWeight: FONT_WEIGHT.bold
  }
})
