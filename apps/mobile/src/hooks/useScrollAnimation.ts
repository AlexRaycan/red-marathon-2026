import {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

export function useScrollAnimation() {
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(e =>
    scrollY.set(e.contentOffset.y)
  )

  return { scrollY, scrollHandler }
}
