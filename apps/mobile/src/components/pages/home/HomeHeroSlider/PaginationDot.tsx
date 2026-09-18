import { COLORS, RADIUS } from '@app/tokens'
import { StyleSheet } from 'react-native'
import Animated, {
  Extrapolation,
  type SharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'

interface PaginationDotProps {
  index: number
  width: number
  scrollX: SharedValue<number>
}

export function PaginationDot({ index, width, scrollX }: PaginationDotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

    return {
      width: interpolate(
        scrollX.get(),
        inputRange,
        [6, 18, 6],
        Extrapolation.CLAMP
      ),

      opacity: interpolate(
        scrollX.get(),
        inputRange,
        [0.35, 1, 0.35],
        Extrapolation.CLAMP
      )
    }
  })

  return <Animated.View style={[styles.dot, animatedStyle]}></Animated.View>
}

const styles = StyleSheet.create({
  dot: {
    height: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary
  }
})
