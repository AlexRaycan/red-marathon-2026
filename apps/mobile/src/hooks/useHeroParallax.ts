import { useWindowDimensions } from 'react-native'
import {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue
} from 'react-native-reanimated'

const HERO_PARALLAX = {
  heightRatio: 1.35,
  minOpacity: 0.1,
  scrollSpeed: 0.3,
  maxOverscrollScale: 2
}

export function useHeroParallax() {
  const { width } = useWindowDimensions()
  const heroHeight = width * HERO_PARALLAX.heightRatio

  const isReducedMotion = useReducedMotion()

  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(e =>
    scrollY.set(e.contentOffset.y)
  )

  const heroStyle = useAnimatedStyle(() => {
    const y = scrollY.get()

    const opacity = interpolate(
      y,
      [0, heroHeight],
      [1, HERO_PARALLAX.minOpacity],
      'clamp'
    )

    if (isReducedMotion) return { opacity }

    return {
      opacity,
      transform: [
        {
          translateY: interpolate(
            y,
            [-heroHeight, 0, heroHeight],
            [heroHeight / 2, 0, -heroHeight * HERO_PARALLAX.scrollSpeed],
            'clamp'
          )
        },
        {
          scale: interpolate(
            y,
            [-heroHeight, 0],
            [HERO_PARALLAX.maxOverscrollScale, 1],
            'clamp'
          )
        }
      ]
    }
  })

  return {
    heroHeight,
    heroStyle,
    scrollHandler
  }
}
