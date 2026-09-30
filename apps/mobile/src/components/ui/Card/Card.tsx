import { COLORS, RADIUS } from '@app/tokens'
import { Image, type ImageStyle } from 'expo-image'
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { CardStack } from './CardStack'

interface CardProps extends ViewProps {
  sourceImage: string | null
  cardWidth: number
  isStacked?: boolean
  cardStyle?: StyleProp<ViewStyle>
  coverStyle?: StyleProp<ImageStyle>
  style?: StyleProp<ViewStyle>
  onPress: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function Card({
  sourceImage,
  cardWidth,
  isStacked,
  cardStyle,
  coverStyle,
  children,
  style,
  onPress
}: CardProps) {
  const scale = useSharedValue(1)

  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const handlePressIn = () => scale.set(withSpring(0.95))
  const handlePressOut = () => scale.set(withSpring(1))

  return (
    <View
      style={[
        style,
        {
          position: 'relative',
          width: cardWidth,
          height: cardWidth * 1.5
        }
      ]}
    >
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.card, animated, cardStyle]}
      >
        {isStacked && (
          <CardStack
            source={sourceImage}
            borderRadius={RADIUS.md}
            style={styles.cover}
          />
        )}
        <Image
          source={sourceImage}
          transition={200}
          contentFit='cover'
          style={[StyleSheet.absoluteFill, styles.cover, coverStyle]}
        />

        {children}
      </AnimatedPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    flex: 1,
    backgroundColor: COLORS.bg.card,
    borderRadius: RADIUS.md
  },
  cover: {
    borderRadius: RADIUS.md,
    overflow: 'hidden'
  }
})
