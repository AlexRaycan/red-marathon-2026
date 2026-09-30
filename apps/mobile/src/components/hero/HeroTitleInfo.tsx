import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import {
  type StyleProp,
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle
} from 'react-native'
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated'

const DURATION_MS = 300

interface HeroTitleInfoProps extends ViewProps {
  keyItem: string
  name: string
  nameLines?: number
  genres: string[]
  meta?: string
  description: string | null
  descriptionLines?: number
  style?: StyleProp<ViewStyle>
}

export function HeroTitleInfo({
  keyItem,
  name,
  nameLines = 2,
  genres,
  meta,
  description,
  descriptionLines = 2,
  style
}: HeroTitleInfoProps) {
  const entering = (delay = 0) => FadeInUp.duration(DURATION_MS).delay(delay)
  const exiting = (delay = 0) =>
    FadeOutDown.duration(DURATION_MS / 2).delay(delay)

  return (
    <View
      pointerEvents='none'
      style={[styles.root, style]}
    >
      <Animated.Text
        key={`heroSliderItemInfo_name_${keyItem}`}
        numberOfLines={nameLines}
        entering={entering()}
        exiting={exiting()}
        style={[styles.name]}
      >
        {name}
      </Animated.Text>

      {!!genres.length && (
        <Animated.Text
          key={`heroSliderItemInfo_genres_${keyItem}`}
          numberOfLines={1}
          entering={entering(50)}
          exiting={exiting(50)}
          style={[styles.baseText, styles.genres]}
        >
          {genres.slice(0, 3).join(' • ')}
        </Animated.Text>
      )}

      {!!meta && (
        <Animated.Text
          key={`heroSliderItemInfo_meta_${keyItem}`}
          numberOfLines={1}
          entering={entering(75)}
          exiting={exiting(75)}
          style={[styles.baseText, styles.meta]}
        >
          {meta}
        </Animated.Text>
      )}

      {!!description && (
        <Animated.View
          key={`heroSliderItemInfo_description_${keyItem}`}
          entering={entering(100)}
          exiting={exiting(100)}
        >
          <Animated.Text
            numberOfLines={descriptionLines}
            style={[styles.baseText, styles.description]}
          >
            {description}
          </Animated.Text>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: SPACINGS[1]
  },
  name: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['3xl'],
    fontWeight: FONT_WEIGHT.bold
  },
  baseText: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm
  },
  genres: {},
  meta: {},
  description: {
    opacity: 0.5,
    lineHeight: FONT_SIZE.sm * 1.5
  }
})
