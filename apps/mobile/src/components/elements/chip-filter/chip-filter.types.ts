import type { LucideIcon } from 'lucide-react-native'

export interface IChipOption<T extends string> {
  value: T | null
  label: string
  icon: LucideIcon
  isFilledIcon?: boolean
  count?: number
}
