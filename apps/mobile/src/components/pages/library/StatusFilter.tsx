import { STATUS_LABELS } from '@app/constants'
import { COLORS, LAYOUT, RADIUS, SPACINGS } from '@app/tokens'
import type { TLibraryStatus } from '@app/types'
import hexToRgba from 'hex-to-rgba'
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

import { Button, GlassContainer } from '@/components/ui'

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
      <GlassContainer style={styles.content}>
        {STATUSES.map(status => {
          const isActive = status === value
          const Icon = status ? STATUS_ICONS[status] : LayoutGrid
          const isFilledIcon = status !== 'DROPPED' && status !== 'COMPLETED'
          const activeStroke = !isFilledIcon ? 3 : undefined

          return (
            <Button
              key={status ?? 'ALL'}
              label={status ? STATUS_LABELS[status] : 'All'}
              icon={Icon}
              variant='secondary'
              tintColor={hexToRgba(
                isActive ? COLORS.status.success : COLORS.bg.card,
                1
              )}
              contentColor={COLORS.text.primary}
              withFillIcon={isActive && isFilledIcon}
              {...(isActive && activeStroke && { strokeWidth: activeStroke })}
              onPress={() => onChange(status)}
              style={[styles.chip]}
            ></Button>
          )
        })}
      </GlassContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: { flexGrow: 0, overflow: 'visible' },
  content: {
    flexDirection: 'row',
    gap: SPACINGS[2],
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  chip: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[1],
    paddingRight: SPACINGS[4],
    paddingLeft: SPACINGS[4] - 2,
    borderRadius: RADIUS.full
  }
})
