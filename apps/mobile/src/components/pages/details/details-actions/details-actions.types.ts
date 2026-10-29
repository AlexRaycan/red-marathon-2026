import type { LibraryEntryResponseStatus } from '@app/api'
import type { TButtonSize, TNextLibraryStatus } from '@app/types'
import type { Toggle } from '@expo/ui/swift-ui'
import type { ComponentProps, ReactElement } from 'react'
import type { ColorValue } from 'react-native'

export type TSFSymbol = NonNullable<
  ComponentProps<typeof Toggle>['systemImage']
>

interface TriggerProps {
  onLongPress: () => void
}

export interface DetailsLongPressProps {
  label: string
  status: LibraryEntryResponseStatus | null
  nextStatus: TNextLibraryStatus
  size?: TButtonSize
  tintColor?: ColorValue
  renderTrigger: (props: TriggerProps) => ReactElement
  onPress: () => void
  selectStatus: (item: LibraryEntryResponseStatus) => void
  removeFromLibrary: () => void
}
