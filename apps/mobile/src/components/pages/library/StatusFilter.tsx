import { STATUS_LABELS } from '@app/constants'
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  LAYOUT,
  RADIUS,
  SPACINGS
} from '@app/tokens'
import type { TLibraryStatus } from '@app/types'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const STATUSES = [
  null,
  ...Object.keys(STATUS_LABELS)
] as (TLibraryStatus | null)[]

interface StatusFilterProps {
  value: TLibraryStatus | null
  onChange: (value: TLibraryStatus | null) => void
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={styles.content}
    >
      {STATUSES.map(status => {
        const isActive = status === value

        return (
          <Pressable
            key={status ?? 'ALL'}
            onPress={() => onChange(status)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {status ? STATUS_LABELS[status] : 'All'}
            </Text>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: { flexGrow: 0 },
  content: {
    gap: SPACINGS[2],
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  chip: {
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: SPACINGS[4],
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bg.card
  },
  chipActive: { backgroundColor: COLORS.primary },
  label: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium
  },
  labelActive: { color: COLORS.text.secondary }
})
