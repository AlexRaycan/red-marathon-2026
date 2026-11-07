import type { PickerDtoDuration } from '@app/api'
import { DURATION_OPTIONS, MOOD_OPTIONS } from '@app/constants'
import { addIconToOptions } from '@app/utils'
import {
  Clock,
  Compass,
  Heart,
  Hourglass,
  Laugh,
  Leaf,
  type LucideIcon,
  Moon,
  Shuffle,
  Sunset,
  Zap
} from 'lucide-react-native'

import type { IChipOption } from '@/types'

type TMood = NonNullable<(typeof MOOD_OPTIONS)[number]['value']>

const MOOD_ICONS: Record<TMood, LucideIcon> = {
  excited: Zap,
  chill: Leaf,
  emotional: Heart,
  curious: Compass,
  dark: Moon,
  funny: Laugh
}

const DURATION_ICONS: Record<PickerDtoDuration, LucideIcon> = {
  short: Zap,
  medium: Sunset,
  long: Hourglass
}

export const MOOD_OPTIONS_MOBILE: IChipOption<TMood>[] = MOOD_OPTIONS.map(
  option => addIconToOptions(option, MOOD_ICONS, Shuffle)
)
export const DURATION_OPTIONS_MOBILE: IChipOption<PickerDtoDuration>[] =
  DURATION_OPTIONS.map(option =>
    addIconToOptions(option, DURATION_ICONS, Clock)
  )
