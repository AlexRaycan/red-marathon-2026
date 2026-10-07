import type { TNextLibraryStatus } from '@app/types'
import { Check, type LucideIcon, Play, Plus } from 'lucide-react-native'

export const LIBRARY_ACTION_ICONS: Record<TNextLibraryStatus, LucideIcon> = {
  PLANNED: Plus,
  IN_PROGRESS: Play,
  COMPLETED: Check
}
