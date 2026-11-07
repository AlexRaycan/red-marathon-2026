import type { IOption } from '@app/types'
import type { LucideIcon } from 'lucide-react-native'

export interface IChipOption<T extends string> extends IOption<T> {
  icon: LucideIcon
}
