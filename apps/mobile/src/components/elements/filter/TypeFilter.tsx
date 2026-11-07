import { TYPE_LABELS } from '@app/constants'
import type { TTitleType } from '@app/types'
import { LayoutGrid } from 'lucide-react-native'

import { TITLE_CARD_CONFIG } from '../titles'

import { ChipFilter } from './ChipFilter'
import type { IChipOption } from '@/types'

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
