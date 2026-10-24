import { TYPE_LABELS } from '@app/constants'
import type { TTitleType } from '@app/types'
import { LayoutGrid } from 'lucide-react-native'

import {
  ChipFilter,
  type IChipOption,
  TITLE_CARD_CONFIG
} from '@/components/elements'

const TYPES = Object.keys(TYPE_LABELS) as TTitleType[]

interface TypeFilterProps {
  value: TTitleType | null
  onChange: (type: TTitleType | null) => void
}

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  const options: IChipOption<TTitleType>[] = [
    {
      value: null,
      label: 'All',
      icon: LayoutGrid
    },
    ...TYPES.map(type => ({
      value: type,
      label: TYPE_LABELS[type],
      icon: TITLE_CARD_CONFIG[type].icon
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
