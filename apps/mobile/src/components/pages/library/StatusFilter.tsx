import { LIBRARY_STATUSES, STATUS_LABELS } from '@app/constants'
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

import { ChipFilter, type IChipOption } from '@/components/elements'

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
  const options: IChipOption<TLibraryStatus>[] = [
    {
      value: null,
      label: 'All',
      icon: LayoutGrid,
      count: total
    },
    ...LIBRARY_STATUSES.map(status => ({
      value: status,
      label: STATUS_LABELS[status],
      icon: STATUS_ICONS[status],
      count: counts[status] ?? 0
    }))
  ]

  return (
    <ChipFilter
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}
