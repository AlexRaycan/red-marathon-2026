import { REVIEWS_RATING } from '@app/constants'
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import { Host, Slider } from '@expo/ui'
import { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { HAPTIC_TRIGGERS } from '@/lib/haptics'

interface RatingSliderProps {
  value: number | null
  onChange: (value: number) => void
}

export function RatingSlider({ value, onChange }: RatingSliderProps) {
  const onValueChange = useCallback(
    (nextValue: number) => {
      const rating = Math.round(nextValue)

      if (rating === value) return

      void HAPTIC_TRIGGERS.impact('Light')

      onChange(nextValue)
    },
    [onChange, value]
  )

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.value}>{value ?? '-'}</Text>
        <Text style={styles.max}>/{REVIEWS_RATING.max}</Text>
      </View>

      <Host style={styles.host}>
        <Slider
          min={REVIEWS_RATING.min}
          max={REVIEWS_RATING.max}
          value={value ?? REVIEWS_RATING.min}
          step={1}
          onValueChange={onValueChange}
        />
      </Host>
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
    justifyContent: 'center',
    gap: SPACINGS[1]
  },
  value: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.giant,
    fontWeight: FONT_WEIGHT.bold,
    fontVariant: ['tabular-nums']
  },
  max: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE['2xl']
  },
  host: {
    height: 44
  }
})
