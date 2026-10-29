import type { LibraryEntryResponseStatus } from '@app/api'
import { LIBRARY_STATUSES, STATUS_LABELS } from '@app/constants'
import type { TButtonSize } from '@app/types'
import {
  ContextMenu,
  Divider,
  Host,
  Button as MenuButton,
  RNHostView,
  type RNHostViewProps,
  Toggle
} from '@expo/ui/swift-ui'
import { StyleSheet } from 'react-native'

interface DetailsLongPressProps extends Pick<RNHostViewProps, 'children'> {
  status: LibraryEntryResponseStatus | null
  size?: TButtonSize
  selectStatus: (item: LibraryEntryResponseStatus) => void
  removeFromLibrary: () => void
}

export function DetailsLongPress({
  status,
  size = 'md',
  children,
  selectStatus,
  removeFromLibrary
}: DetailsLongPressProps) {
  const height = size === 'md' ? 44 : 56

  // DOC: Android `DropdownMenu`
  return (
    <Host style={{ height }}>
      <ContextMenu>
        <ContextMenu.Items>
          {LIBRARY_STATUSES.map(item => (
            <Toggle
              key={item}
              label={STATUS_LABELS[item]}
              isOn={item === status}
              onIsOnChange={() => selectStatus(item)}
            />
          ))}

          {!!status && <Divider />}

          {!!status && (
            <MenuButton
              label='Remove from Library'
              systemImage='trash'
              role='destructive'
              onPress={removeFromLibrary}
            />
          )}
        </ContextMenu.Items>

        <ContextMenu.Trigger>
          <RNHostView>{children}</RNHostView>
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  )
}

const styles = StyleSheet.create({
  root: {
    height: 56
  }
})
