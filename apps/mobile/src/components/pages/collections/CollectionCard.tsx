import type { CollectionListItemResponse } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACINGS } from '@app/tokens'
import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { AnimatedPressable } from '@/components/ui'

interface CollectionCardProps {
  collection: CollectionListItemResponse
  width?: number
}

const STACK_LIFT = 10
const STACK_OFFSET = -12

export function CollectionCard({
  collection,
  width = 300
}: CollectionCardProps) {
  const { id, name, previewCovers } = collection
  const [mainCover, middleCover, backCover] = previewCovers

  const height = width * 1.5
  const pressed = useSharedValue(0)

  const middleLayerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -pressed.get() * STACK_LIFT }]
  }))

  const backLayerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -pressed.get() * STACK_LIFT * 2 }]
  }))

  return (
    <AnimatedPressable
      accessibilityRole='button'
      accessibilityLabel={name}
      style={[{ width, height }, styles.root]}
      // onPress={() => router.push(`/collections/${id}`)}
      onPressIn={() => pressed.set(withSpring(1))}
      onPressOut={() => pressed.set(withSpring(0))}
    >
      <View style={{ flex: 1 }}>
        <Animated.View style={[styles.layer, styles.backLayer, backLayerStyle]}>
          <Image
            source={backCover ?? null}
            contentFit='cover'
            style={[styles.image]}
          />
        </Animated.View>

        <Animated.View
          style={[styles.layer, styles.middleLayer, middleLayerStyle]}
        >
          <Image
            source={middleCover ?? null}
            contentFit='cover'
            style={[styles.image]}
          />
        </Animated.View>

        <View style={[styles.layer, styles.mainLayer]}>
          <Image
            source={mainCover ?? null}
            contentFit='cover'
            style={[styles.image]}
          />
        </View>
      </View>

      <Text
        style={styles.name}
        numberOfLines={1}
      >
        {name}
      </Text>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  root: { gap: SPACINGS[2] },
  name: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium
  },
  layer: {
    ...StyleSheet.absoluteFill,
    position: 'absolute',
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: COLORS.bg.card
  },
  image: { ...StyleSheet.absoluteFill },
  mainLayer: {},
  middleLayer: {
    top: STACK_OFFSET / 2,
    opacity: 0.6,
    left: SPACINGS[1],
    right: SPACINGS[1]
  },
  backLayer: {
    top: STACK_OFFSET,
    opacity: 0.35,
    left: SPACINGS[2],
    right: SPACINGS[2]
  }
})
