import type { LibraryEntryResponseStatus } from '@app/api'

export type TLibraryStatus = LibraryEntryResponseStatus

export type TActiveLibraryStatus = Exclude<TLibraryStatus, 'COMPLETED'>

export type TNextLibraryStatus = Extract<
  TLibraryStatus,
  'PLANNED' | 'IN_PROGRESS' | 'COMPLETED'
>

export interface TLibraryStatusAction {
  label: string
  nextStatus: TNextLibraryStatus
}
