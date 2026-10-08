import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import type { ReactNode } from 'react'
import {
  type StyleProp,
  StyleSheet,
  Text,
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
  platforms?: ReactNode
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
  platforms,
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
      <View style={[styles.infoContainer]}>
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
          <View style={styles.metaContainer}>
            <Animated.Text
              key={`heroSliderItemInfo_meta_${keyItem}`}
              numberOfLines={1}
              entering={entering(75)}
              exiting={exiting(75)}
              style={[styles.baseText]}
            >
              {meta}

              {platforms && (
                <>
                  <Text style={[styles.baseText]}>{' • '}</Text>
                  {platforms}
                </>
              )}
            </Animated.Text>
          </View>
        )}
      </View>

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
    gap: SPACINGS[2]
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
  infoContainer: {
    gap: SPACINGS[1]
  },
  genres: {},
  metaContainer: {
    flexDirection: 'row',
    gap: SPACINGS[1],
    alignItems: 'center'
  },
  meta: {},
  description: {
    opacity: 0.5,
    lineHeight: FONT_SIZE.sm * 1.5
  }
})
