import { COLORS, FONT_SIZE, LAYOUT, RADIUS, SPACINGS } from '@app/tokens'
import { getCardWidth } from '@app/utils'
import { Image, type ImageStyle } from 'expo-image'
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewProps,
  type ViewStyle,
  useWindowDimensions
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { CardStack } from './CardStack'

interface CardProps extends ViewProps {
  label?: string
  sourceImage: string | null
  cardWidth?: number
  isStacked?: boolean
  cardStyle?: StyleProp<ViewStyle>
  coverStyle?: StyleProp<ImageStyle>
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function Card({
  label,
  sourceImage,
  cardWidth,
  isStacked,
  cardStyle,
  coverStyle,
  children,
  style,
  onPress
}: CardProps) {
  const { width: windowWidth } = useWindowDimensions()

  const scale = useSharedValue(1)

  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const width =
    cardWidth ??
    getCardWidth(windowWidth, 3.15, {
      gap: SPACINGS[3],
      paddingLeft: LAYOUT['space-horizontal']
    })

  const handlePressIn = () => scale.set(withSpring(0.95))
  const handlePressOut = () => scale.set(withSpring(1))

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.root, { width }, style, animated]}
    >
      <View
        style={[
          styles.card,
          {
            height: width * 1.5
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
  root: {
    position: 'relative',
    gap: SPACINGS[1]
  },
  card: {
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
    color: COLORS.text['little-muted'],
    fontSize: FONT_SIZE.sm,
    textAlign: 'center'
  }
})
