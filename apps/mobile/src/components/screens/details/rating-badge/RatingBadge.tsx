import type { DiscoverDetailsResponseExternalSource } from '@app/api'
import { METACRITIC, RATINGS_SOURCES } from '@app/constants'
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '@app/tokens'
import { getMetacriticColor } from '@app/utils'
import hexToRgba from 'hex-to-rgba'
import { StyleSheet, Text } from 'react-native'

import { GlassBadge } from '@/components/ui'

interface RatingBadgeProps {
  source: DiscoverDetailsResponseExternalSource
  rating: number | null
  metacritic: number | null
}

export function RatingBadge({ source, rating, metacritic }: RatingBadgeProps) {
  if (metacritic) {
    const metaColor = getMetacriticColor(metacritic)

    return (
      <GlassBadge accentColor={hexToRgba(metaColor, 0.3)}>
        <Text style={[styles.source, { color: metaColor }]}>
          {METACRITIC.label}
        </Text>

        <Text style={styles.rating}>
          {metacritic}
          <Text style={styles.scale}>/{METACRITIC.scale}</Text>
        </Text>
      </GlassBadge>
    )
  }

  if (!rating) return null

  const { label, color, scale } = RATINGS_SOURCES[source]

  return (
    <GlassBadge>
      <Text style={[styles.source, { color }]}>{label}</Text>

      <Text style={styles.rating}>
        {rating.toFixed(1)}
        <Text style={styles.scale}>/{scale}</Text>
      </Text>
    </GlassBadge>
  )
}

const styles = StyleSheet.create({
  source: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold
  },
  rating: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold
  },
  scale: {
    color: COLORS.text.muted,
    fontWeight: FONT_WEIGHT.medium
  }
})
