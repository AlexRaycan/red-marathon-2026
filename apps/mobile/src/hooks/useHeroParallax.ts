import { useWindowDimensions } from 'react-native'
import {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'

export function useHeroParallax() {
  const { width } = useWindowDimensions()
  const heroHeight = width * 1.35

  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(e =>
    scrollY.set(e.contentOffset.y)
  )

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

  return {
    heroHeight,
    heroStyle,
    scrollHandler
  }
}
