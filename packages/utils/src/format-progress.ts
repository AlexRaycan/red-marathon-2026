import { PROGRESS_FORMATS } from '@app/constants'
import type { TProgressUnit } from '@app/types'

export function formatProgress(
  progress: number | null,
  unit: TProgressUnit | null
) {
  if (progress === null || !unit) return null

  return PROGRESS_FORMATS[unit](progress)
}
