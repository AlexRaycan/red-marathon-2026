import { Image } from 'expo-image'
import { StyleSheet, View, useWindowDimensions } from 'react-native'

import anime from '@/assets/images/subscriptions/anime_01.png'
import bookOpen from '@/assets/images/subscriptions/book_01.png'
import bookStack from '@/assets/images/subscriptions/book_02.png'
import gamepad from '@/assets/images/subscriptions/game_01.png'
import headphones from '@/assets/images/subscriptions/game_02.png'
import clapperboard from '@/assets/images/subscriptions/movie_01.png'
import film from '@/assets/images/subscriptions/movie_02.png'
import tickets from '@/assets/images/subscriptions/series_01.png'

const DECORATIONS = [
  {
    id: 'clapperboard',
    source: clapperboard,
    edge: 'right',
    centerY: 6,
    inset: 12,
    size: 64,
    rotation: -22,
    opacity: 0.45
  },
  {
    id: 'book-open',
    source: bookOpen,
    edge: 'left',
    centerY: 18,
    inset: 12,
    size: 78,
    rotation: 18,
    opacity: 0.5
  },
  {
    id: 'gamepad',
    source: gamepad,
    edge: 'right',
    centerY: 32,
    inset: 50,
    size: 84,
    rotation: 0,
    opacity: 0.53
  },
  {
    id: 'anime',
    source: anime,
    edge: 'left',
    centerY: 37,
    inset: 18,
    size: 62,
    rotation: 5,
    opacity: 0.3
  },
  {
    id: 'tickets',
    source: tickets,
    edge: 'right',
    centerY: 56,
    inset: 16,
    size: 66,
    rotation: -100,
    opacity: 0.46
  },
  {
    id: 'book-stack',
    source: bookStack,
    edge: 'left',
    centerY: 68,
    inset: 0,
    size: 74,
    rotation: -25,
    opacity: 0.6
  },
  {
    id: 'headphones',
    source: headphones,
    edge: 'right',
    centerY: 80,
    inset: 0,
    size: 80,
    rotation: 20,
    opacity: 0.45
  },
  {
    id: 'film',
    source: film,
    edge: 'left',
    centerY: 92,
    inset: 0,
    size: 100,
    rotation: -16,
    opacity: 0.45
  }
] as const

export function SubscriptionDecorations() {
  const { width } = useWindowDimensions()
  const scale = Math.min(1.15, Math.max(0.85, width / 390))

  return (
    <View
      pointerEvents='none'
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility='no-hide-descendants'
      style={styles.root}
    >
      {DECORATIONS.map(decoration => {
        const size = decoration.size * scale

        return (
          <Image
            key={decoration.id}
            source={decoration.source}
            contentFit='contain'
            accessible={false}
            style={[
              styles.decoration,
              {
                [decoration.edge]: -size / 2 + decoration.inset,
                top: `${decoration.centerY}%`,
                marginTop: -size / 2,
                width: size,
                height: size,
                opacity: decoration.opacity,
                transform: [{ rotate: `${decoration.rotation}deg` }]
              }
            ]}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden'
  },
  decoration: {
    position: 'absolute'
  }
})
