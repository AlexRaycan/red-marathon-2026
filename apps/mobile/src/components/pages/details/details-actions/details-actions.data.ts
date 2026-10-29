import type { TLibraryStatus, TNextLibraryStatus } from '@app/types'
import {
  Bookmark,
  Check,
  CheckCircle2,
  type LucideIcon,
  PauseCircle,
  Play,
  Plus,
  X
} from 'lucide-react-native'

import type { TSFSymbol } from './details-actions.types'

export const LIBRARY_ACTION_ICONS: Record<TNextLibraryStatus, LucideIcon> = {
  PLANNED: Plus,
  IN_PROGRESS: Play,
  COMPLETED: Check
}

export const MAIN_STATUSES: TLibraryStatus[] = [
  'PLANNED',
  'IN_PROGRESS',
  'COMPLETED'
]
export const PAUSED_STATUSES: TLibraryStatus[] = ['ON_HOLD', 'DROPPED']

export const STATUS_SYMBOLS_IOS: Record<TLibraryStatus, TSFSymbol> = {
  PLANNED: 'bookmark',
  IN_PROGRESS: 'play',
  COMPLETED: 'checkmark.circle',
  ON_HOLD: 'pause',
  DROPPED: 'xmark'
}

export const ACTION_SYMBOLS_IOS: Record<TNextLibraryStatus, TSFSymbol> = {
  PLANNED: 'plus',
  IN_PROGRESS: 'play',
  COMPLETED: 'checkmark'
}

export const STATUS_SYMBOLS_ANDROID: Record<TLibraryStatus, LucideIcon> = {
  PLANNED: Bookmark,
  IN_PROGRESS: Play,
  COMPLETED: CheckCircle2,
  ON_HOLD: PauseCircle,
  DROPPED: X
}
