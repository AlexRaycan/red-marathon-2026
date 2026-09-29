import { COLORS, RADIUS } from '@app/tokens'
import { StyleSheet } from 'react-native'
import Animated, {
  Extrapolation,
  type SharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'

interface PaginationDotProps {
  itemWidth: number
  index: number
  scrollX: SharedValue<number>
}

export function PaginationDot({
  itemWidth,
  index,
  scrollX
}: PaginationDotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * itemWidth,
      index * itemWidth,
      (index + 1) * itemWidth
    ]

    return {
      width: interpolate(
        scrollX.value,
        inputRange,
        [6, 18, 6],
        Extrapolation.CLAMP
      ),

      opacity: interpolate(
        scrollX.value,
        inputRange,
        [0.35, 1, 0.35],
        Extrapolation.CLAMP
      )
    }
  })

  return <Animated.View style={[styles.dot, animatedStyle]} />
}

const styles = StyleSheet.create({
  dot: {
    height: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary
  }
})
