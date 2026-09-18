import type { TitleListItemResponse } from '@app/api'
import { COLORS, RADIUS } from '@app/tokens'
import { Image } from 'expo-image'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { TITLE_CARD_CONFIG } from './TitleCard.config'
import { TitleCardBadge } from './TitleCardBadge'
import { TitleCardBookFX } from './TitleCardBookFX'
import { TitleCardStack } from './TitleCardStack'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface Props {
  title: TitleListItemResponse
  width: number
  onPress: () => void
}

export function TitleCard({ title, width, onPress }: Props) {
  const config = TITLE_CARD_CONFIG[title.type]

  const scale = useSharedValue(1)

  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const handlePressIn = () => scale.set(withSpring(0.95))
  const handlePressOut = () => scale.set(withSpring(1))

  return (
    <View
      style={{
        position: 'relative',
        width,
        height: width * 1.5
      }}
    >
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.card,
          animated,
          {
            borderRadius: config.radius
          },
          config.glow && {
            boxShadow: `inset 0 0 8px 4px ${config.glow}`
          }
        ]}
      >
        {config.stacked && (
          <TitleCardStack
            source={title.coverUrl}
            borderRadius={config.radius}
            style={styles.cover}
          />
        )}
        <Image
          source={title.coverUrl}
          transition={200}
          contentFit='cover'
          style={[
            StyleSheet.absoluteFill,
            styles.cover,
            config.spine && styles.bookCover
          ]}
        />

        {config.spine && <TitleCardBookFX />}

        <TitleCardBadge
          accentColor={config.accent}
          icon={config.icon}
        />
      </AnimatedPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    flex: 1,
    backgroundColor: COLORS.bg.card
  },
  cover: {
    borderRadius: RADIUS.md,
    overflow: 'hidden'
  },
  bookCover: {
    borderTopLeftRadius: RADIUS.sm,
    borderBottomLeftRadius: RADIUS.sm
  }
})
