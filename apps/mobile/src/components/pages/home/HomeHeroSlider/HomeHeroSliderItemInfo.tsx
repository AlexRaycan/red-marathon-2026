import { useDiscoverFindByKey } from '@app/api'
import type { DiscoverItemResponse } from '@app/api/src/generated/model'
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import { StyleSheet, View, type ViewProps } from 'react-native'
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated'

const DURATION_MS = 300

interface HomeHeroItemInfoProps extends ViewProps {
  item?: DiscoverItemResponse
}

export function HomeHeroItemInfo({ item }: HomeHeroItemInfoProps) {
  const { data, isPending } = useDiscoverFindByKey(item?.key ?? '')

  const { data: itemDetails, status } = data ?? {}

  if (status !== 200) return null

  if (isPending) return null

  if (!itemDetails) return null

  const entering = (delay = 0) => FadeInUp.duration(DURATION_MS).delay(delay)
  const exiting = (delay = 0) =>
    FadeOutDown.duration(DURATION_MS / 2).delay(delay)

  return (
    <View
      pointerEvents='none'
      style={styles.root}
    >
      <Animated.Text
        key={`heroSliderItemInfo_name_${itemDetails?.key}`}
        numberOfLines={2}
        entering={entering()}
        exiting={exiting()}
        style={[styles.name]}
      >
        {itemDetails?.name}
      </Animated.Text>

      <Animated.Text
        key={`heroSliderItemInfo_genres_${itemDetails?.key}`}
        numberOfLines={1}
        entering={entering(50)}
        exiting={exiting(50)}
        style={styles.genres}
      >
        {itemDetails?.genres.join(' • ')}
      </Animated.Text>

      <Animated.View
        key={`heroSliderItemInfo_description_${itemDetails?.key}`}
        entering={entering(100)}
        exiting={exiting(100)}
      >
        <Animated.Text
          numberOfLines={2}
          style={styles.description}
        >
          {itemDetails?.description}
        </Animated.Text>
      </Animated.View>
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
  genres: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular
  },
  description: {
    color: COLORS.text.primary,
    opacity: 0.5,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular
  }
})
