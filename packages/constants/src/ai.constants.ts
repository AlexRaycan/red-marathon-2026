import type { PickerDtoDuration } from '@app/api'
import type { IOption } from '@app/types'

export const MOOD_OPTIONS = [
  { value: null, label: 'Any mood' },
  { value: 'excited', label: 'Excited' },
  { value: 'chill', label: 'Chill' },
  { value: 'emotional', label: 'Emotional' },
  { value: 'curious', label: 'Curious' },
  { value: 'dark', label: 'Dark' },
  { value: 'funny', label: 'Funny' }
] as const satisfies readonly IOption<string>[]

export const DURATION_OPTIONS = [
  { value: null, label: 'Any time' },
  { value: 'short', label: 'Quick' },
  { value: 'medium', label: 'Evening' },
  { value: 'long', label: 'Long' }
] as const satisfies readonly IOption<PickerDtoDuration>[]
