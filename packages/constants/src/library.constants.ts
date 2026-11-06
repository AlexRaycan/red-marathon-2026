import type {
  TActiveLibraryStatus,
  TLibraryStatusAction,
  TProgressUnit
} from '@app/types'

export const ADD_TO_LIBRARY_ACTION: TLibraryStatusAction = {
  label: 'Add to Library',
  nextStatus: 'PLANNED'
}

export const WRITE_REVIEW_ACTION: TLibraryStatusAction = {
  label: 'Write a Review',
  nextStatus: 'COMPLETED'
}

const RESUME_ACTION: TLibraryStatusAction = {
  label: 'Resume',
  nextStatus: 'IN_PROGRESS'
}
export const LIBRARY_STATUS_ACTIONS: Record<
  TActiveLibraryStatus,
  TLibraryStatusAction
> = {
  PLANNED: { label: 'Start', nextStatus: 'IN_PROGRESS' },
  IN_PROGRESS: { label: 'Mark as Completed', nextStatus: 'COMPLETED' },
  ON_HOLD: RESUME_ACTION,
  DROPPED: RESUME_ACTION
}

export const PROGRESS_FORMATS: Record<
  TProgressUnit,
  (value: number) => string
> = {
  EPISODE: value => `Ep ${value}`,
  CHAPTER: value => `Ch ${value}`,
  PAGE: value => `p. ${value}`,
  HOUR: value => `${value}h`,
  PERCENT: value => `${value}%`
}
