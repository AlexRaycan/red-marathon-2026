import type { LibraryEntryResponseStatus } from '@app/api'
import { STATUS_LABELS } from '@app/constants'
import { COLORS, RADIUS } from '@app/tokens'
import { Host } from '@expo/ui'
import {
  DropdownMenu,
  DropdownMenuItem,
  HorizontalDivider,
  RNHostView,
  Text
} from '@expo/ui/jetpack-compose'
import { Trash } from 'lucide-react-native'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

import {
  MAIN_STATUSES,
  PAUSED_STATUSES,
  STATUS_SYMBOLS_ANDROID
} from './details-actions.data'
import type { DetailsLongPressProps } from './details-actions.types'

export function DetailsLongPress({
  status,
  size = 'md',
  tintColor,
  renderTrigger,
  selectStatus,
  removeFromLibrary
}: DetailsLongPressProps) {
  const height = size === 'md' ? 44 : 56
  const [isExpanded, setIsExpanded] = useState(false)

  const renderStatus = (item: LibraryEntryResponseStatus) => {
    const Icon = STATUS_SYMBOLS_ANDROID[item]
    const isSelected = item === status

    return (
      <DropdownMenuItem
        key={item}
        onClick={() => {
          selectStatus(item)
          setIsExpanded(false)
        }}
      >
        <DropdownMenuItem.LeadingIcon>
          <Icon
            size={13}
            color={isSelected ? tintColor : COLORS.text.primary}
          />
        </DropdownMenuItem.LeadingIcon>
        <DropdownMenuItem.Text>
          <Text color={isSelected ? tintColor : COLORS.text.primary}>
            {STATUS_LABELS[item]}
          </Text>
        </DropdownMenuItem.Text>
      </DropdownMenuItem>
    )
  }

  return (
    <Host style={{ height }}>
      <DropdownMenu
        expanded={isExpanded}
        onDismissRequest={() => setIsExpanded(false)}
        cornerRadius={RADIUS.sm}
        style={styles.root}
      >
        <DropdownMenu.Trigger>
          <RNHostView>
            {renderTrigger({
              onLongPress: () => setIsExpanded(true)
            })}
          </RNHostView>
        </DropdownMenu.Trigger>

        <DropdownMenu.Items>
          {MAIN_STATUSES.map(renderStatus)}

          <HorizontalDivider />

          {PAUSED_STATUSES.map(renderStatus)}

          <HorizontalDivider />

          <DropdownMenuItem
            onClick={() => {
              removeFromLibrary()
              setIsExpanded(false)
            }}
          >
            <DropdownMenuItem.LeadingIcon>
              <Trash
                size={13}
                color={COLORS.status.error}
              />
            </DropdownMenuItem.LeadingIcon>
            <DropdownMenuItem.Text>
              <Text color={COLORS.status.error}>Remove from Library</Text>
            </DropdownMenuItem.Text>
          </DropdownMenuItem>
        </DropdownMenu.Items>
      </DropdownMenu>
    </Host>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
