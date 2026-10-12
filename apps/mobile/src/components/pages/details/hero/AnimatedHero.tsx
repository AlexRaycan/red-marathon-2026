import { StyleSheet } from 'react-native'
import Animated, {
  type SharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'

import { HeroBackdrop } from '@/components/hero'

interface AnimatedHeroProps {
  coverUrl: string | null
  heroHeight: number
  scrollY: SharedValue<number>
}

export function AnimatedHero({
  coverUrl,
  heroHeight,
  scrollY
}: AnimatedHeroProps) {
  const heroStyle = useAnimatedStyle(() => {
    const y = scrollY.get()

    return {
      opacity: interpolate(y, [0, heroHeight], [1, 0.1], 'clamp'),
      transform: [
        {
          translateY: interpolate(
            y,
            [-heroHeight, 0, heroHeight],
            [heroHeight / 2, 0, -heroHeight * 0.3],
            'clamp'
          )
        },
        {
          scale: interpolate(y, [-heroHeight, 0], [2, 1], 'clamp')
        }
      ]
    }
  })

  return (
    <Animated.View
      style={[styles.hero, heroStyle]}
      pointerEvents={'none'}
    >
      <HeroBackdrop
        coverUrl={coverUrl}
        height={heroHeight}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
})
