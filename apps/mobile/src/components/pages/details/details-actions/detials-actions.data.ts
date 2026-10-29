import type { TLibraryStatus, TNextLibraryStatus } from '@app/types'
import { Check, type LucideIcon, Play, Plus } from 'lucide-react-native'

import type { TSFSymbol } from './details-action.types'

export const LIBRARY_ACTION_ICONS: Record<TNextLibraryStatus, LucideIcon> = {
  PLANNED: Plus,
  IN_PROGRESS: Play,
  COMPLETED: Check
}

export const STATUS_SYMBOLS: Record<TLibraryStatus, TSFSymbol> = {
  PLANNED: 'bookmark',
  IN_PROGRESS: 'play',
  COMPLETED: 'checkmark.circle',
  ON_HOLD: 'pause',
  DROPPED: 'xmark'
}

export const ACTION_SYMBOLS: Record<TNextLibraryStatus, TSFSymbol> = {
  PLANNED: 'plus',
  IN_PROGRESS: 'play',
  COMPLETED: 'checkmark'
}

export const MAIN_STATUSES: TLibraryStatus[] = [
  'PLANNED',
  'IN_PROGRESS',
  'COMPLETED'
]
export const PAUSED_STATUSES: TLibraryStatus[] = ['ON_HOLD', 'DROPPED']
