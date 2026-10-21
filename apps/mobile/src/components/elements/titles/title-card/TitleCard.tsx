import type { DiscoverItemResponseType } from '@app/api'
import { COLORS, FONT_SIZE, RADIUS, SPACINGS } from '@app/tokens'
import { Star } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { Card, GlassBadge, GlassView } from '@/components/ui'

import { TITLE_CARD_CONFIG } from './TitleCard.config'
import { TitleCardBookFX } from './TitleCardBookFX'

interface Props {
  label?: string
  type: DiscoverItemResponseType
  coverUrl: string | null
  width?: number
  withBadge?: boolean
  rating?: number
  borderRadius?: number
  onPress?: () => void
}

export function TitleCard({
  label,
  type,
  coverUrl,
  width,
  withBadge: withBadge,
  rating,
  borderRadius,
  onPress
}: Props) {
  const config = TITLE_CARD_CONFIG[type]

  return (
    <Card
      label={label}
      sourceImage={coverUrl}
      cardWidth={width}
      isStacked={config.stacked}
      cardStyle={[
        config.spine && {
          borderRadius: RADIUS.sm,
          overflow: 'hidden'
        },
        !!borderRadius && {
          borderRadius: borderRadius
        }
      ]}
      coverStyle={[
        config.spine && styles.bookCover,
        !!borderRadius && {
          borderRadius: borderRadius
        }
      ]}
      onPress={onPress}
    >
      {config.glow && (
        <View
          style={{
            borderRadius: borderRadius ?? RADIUS.md,
            flex: 1,
            boxShadow: `inset 0 0 8px 4px ${config.glow}`
          }}
        />
      )}

      {config.spine && <TitleCardBookFX />}

      {withBadge && (
        <View style={[styles.badge, styles.left]}>
          <GlassBadge accentColor={config.accent}>
            <config.icon
              size={13}
              color={COLORS.text.primary}
              strokeWidth={2.2}
            />
          </GlassBadge>
        </View>
      )}

      {rating && (
        <View style={[styles.badge, styles.right]}>
          <GlassView style={styles.rating}>
            <Star
              size={13}
              color={COLORS.text.primary}
              fill={COLORS.text.primary}
            />
            <Text style={styles.ratingText}>{rating}</Text>
          </GlassView>
        </View>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: SPACINGS[2]
  },
  left: {
    left: SPACINGS[2]
  },
  right: {
    right: SPACINGS[2]
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[1],
    height: 26,
    paddingHorizontal: SPACINGS[2],
    paddingVertical: SPACINGS[1],
    borderRadius: RADIUS.full
  },
  ratingText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.primary
  },
  bookCover: {
    borderTopLeftRadius: RADIUS.sm,
    borderBottomLeftRadius: RADIUS.sm
  }
})
