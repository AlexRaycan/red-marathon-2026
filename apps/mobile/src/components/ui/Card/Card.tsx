import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  LAYOUT,
  RADIUS,
  SPACINGS
} from '@app/tokens'
import { getCardWidth } from '@app/utils'
import { Image, type ImageStyle } from 'expo-image'
import {
  type Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewProps,
  type ViewStyle,
  useWindowDimensions
} from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'

import { AnimatedPressable } from '../AnimatedPressable'

import { CardStack } from './CardStack'

interface CardProps extends ViewProps {
  label?: string
  sourceImage: string | null
  cardWidth?: number
  aspectRatio?: number
  isStacked?: boolean
  animatedStyle?: AnimatedStyle<Pressable>
  cardStyle?: StyleProp<ViewStyle>
  coverStyle?: StyleProp<ImageStyle>
  onPress?: () => void
}

export function Card({
  label,
  sourceImage,
  cardWidth,
  aspectRatio = 1.5,
  isStacked,
  animatedStyle,
  cardStyle,
  coverStyle,
  children,
  style,
  onPress
}: CardProps) {
  const { width: windowWidth } = useWindowDimensions()
  const width =
    cardWidth ??
    getCardWidth(windowWidth, 3.15, {
      gap: SPACINGS[3],
      paddingLeft: LAYOUT['space-horizontal']
    })

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[{ width }, styles.card, style, animatedStyle]}
    >
      <View
        style={[
          styles.coverWrapper,
          {
            height: width * aspectRatio
          }
        ]}
      >
        {isStacked && (
          <CardStack
            source={sourceImage}
            borderRadius={RADIUS.md}
            style={styles.cover}
          />
        )}

        <View
          style={[StyleSheet.absoluteFill, styles.coverContainer, cardStyle]}
        >
          <Image
            source={sourceImage}
            transition={200}
            contentFit='cover'
            style={[StyleSheet.absoluteFill, styles.cover, coverStyle]}
          />
        </View>

        {children}
      </View>

      {label && label.trim().length > 0 && (
        <Text
          numberOfLines={1}
          style={styles.label}
        >
          {label}
        </Text>
      )}
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  card: {
    gap: SPACINGS[2]
  },
  coverWrapper: {
    position: 'relative',
    flex: 1,
    backgroundColor: COLORS.bg.card,
    borderRadius: RADIUS.md
  },
  coverContainer: {
    borderRadius: RADIUS.md
  },
  cover: {
    borderRadius: RADIUS.md,
    overflow: 'hidden'
  },
  label: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium
  }
})
