import { STATUS_LABELS } from '@app/constants'
import { SPACINGS } from '@app/tokens'
import type { TLibraryStatus } from '@app/types'
import {
  Bookmark,
  Check,
  LayoutGrid,
  type LucideIcon,
  Pause,
  Play,
  X
} from 'lucide-react-native'
import { ScrollView, StyleSheet } from 'react-native'

import { Chip, GlassContainer } from '@/components/ui'

const STATUSES = [
  null,
  ...Object.keys(STATUS_LABELS)
] as (TLibraryStatus | null)[]

const STATUS_ICONS: Record<TLibraryStatus, LucideIcon> = {
  PLANNED: Bookmark,
  IN_PROGRESS: Play,
  COMPLETED: Check,
  ON_HOLD: Pause,
  DROPPED: X
}

interface StatusFilterProps {
  value: TLibraryStatus | null
  counts: Partial<Record<TLibraryStatus, number>>
  total: number
  onChange: (value: TLibraryStatus | null) => void
}

export function StatusFilter({
  value,
  counts,
  total,
  onChange
}: StatusFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={styles.content}
    >
      <GlassContainer style={styles.content}>
        {STATUSES.map(status => {
          const isActive = status === value
          const Icon = status ? STATUS_ICONS[status] : LayoutGrid
          const isFilledIcon = status !== 'DROPPED' && status !== 'COMPLETED'
          const count = status ? (counts[status] ?? 0) : total

          return (
            <Chip
              key={status ?? 'ALL'}
              label={status ? STATUS_LABELS[status] : 'All'}
              icon={Icon}
              count={count}
              isActive={isActive}
              withFillIcon={isActive && isFilledIcon}
              onPress={() => onChange(status)}
            />
          )
        })}
      </GlassContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 0,
    overflow: 'visible',
    marginBottom: SPACINGS[4]
  },
  content: {
    flexDirection: 'row',
    gap: SPACINGS[2]
  }
})
