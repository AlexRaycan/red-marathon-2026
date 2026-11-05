import type { ReviewResponse } from '@app/api'
import { REVIEWS_RATING } from '@app/constants'
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import { getDate } from '@app/utils'
import { Star } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

interface ReviewCardProps {
  review: ReviewResponse
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { rating, author, createdAt, text } = review

  return (
    <View style={styles.root}>
      <View style={styles.rating}>
        <Star
          size={16}
          color={COLORS.primary}
          fill={COLORS.primary}
        />
        <Text style={[styles.baseText, styles.ratingText]}>
          {rating}/{REVIEWS_RATING.max}
        </Text>
      </View>

      <View style={styles.meta}>
        <Text style={[styles.baseText, styles.author]}>
          {author.displayName ?? author.username}
        </Text>
        <Text style={[styles.baseText, styles.date]}>
          {getDate(createdAt).reviewDate}
        </Text>
      </View>

      <Text
        style={[styles.baseText, styles.text]}
        numberOfLines={4}
      >
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: SPACINGS[2]
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[1]
  },
  baseText: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm
  },
  ratingText: {
    // color: COLORS.text.primary,
    // fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  author: {
    color: COLORS.text['little-muted']
    // fontSize: FONT_SIZE.sm
  },
  date: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.sm
  },
  text: {
    color: COLORS.text.primary
    // fontSize: FONT_SIZE.sm
  }
})
