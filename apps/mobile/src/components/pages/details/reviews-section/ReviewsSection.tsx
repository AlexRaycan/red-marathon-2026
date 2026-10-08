import { useReviewFindByDiscoverKey } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import { StyleSheet, Text, View } from 'react-native'

import { ReviewCard } from './ReviewCard'

interface ReviewsSectionProps {
  titleKey: string
}

export function ReviewsSection({ titleKey }: ReviewsSectionProps) {
  const { data } = useReviewFindByDiscoverKey(titleKey, { take: 3 })

  const reviews = data?.status === 200 ? data.data : null

  if (!reviews?.items.length) return null

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        <Text style={styles.count}>{reviews.total}</Text>
      </View>

      {reviews.items.map(review => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: SPACINGS[4]
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACINGS[2]
  },
  title: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold
  },
  count: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.sm
  }
})
