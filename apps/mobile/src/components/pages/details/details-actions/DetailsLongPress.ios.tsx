import type { LibraryEntryResponseStatus } from '@app/api'
import { STATUS_LABELS } from '@app/constants'
import { COLORS, FONT_SIZE } from '@app/tokens'
import {
  Host,
  Label,
  Menu,
  Button as MenuButton,
  Section,
  Toggle
} from '@expo/ui/swift-ui'
import {
  buttonBorderShape,
  buttonStyle,
  font,
  foregroundStyle,
  frame,
  menuIndicator,
  tint
} from '@expo/ui/swift-ui/modifiers'

import {
  ACTION_SYMBOLS_IOS,
  MAIN_STATUSES,
  PAUSED_STATUSES,
  STATUS_SYMBOLS_IOS
} from './details-actions.data'
import { type DetailsLongPressProps } from './details-actions.types'

export function DetailsLongPress({
  label,
  status,
  nextStatus,
  size = 'md',
  tintColor,
  onPress,
  selectStatus,
  removeFromLibrary
}: DetailsLongPressProps) {
  const height = size === 'md' ? 44 : 56

  const renderStatus = (item: LibraryEntryResponseStatus) => (
    <Toggle
      key={item}
      label={STATUS_LABELS[item]}
      systemImage={STATUS_SYMBOLS_IOS[item]}
      isOn={item === status}
      modifiers={[tint(COLORS.text.primary)]}
      onIsOnChange={() => selectStatus(item)}
    />
  )

  return (
    <Host style={{ height }}>
      <Menu
        label={
          <Label
            title={label}
            systemImage={ACTION_SYMBOLS_IOS[nextStatus]}
            modifiers={[
              frame({
                maxWidth: Infinity,
                maxHeight: Infinity
              }),
              font({
                size: FONT_SIZE.base,
                weight: 'semibold'
              })
            ]}
          />
        }
        modifiers={[
          buttonStyle('glassProminent'),
          buttonBorderShape('capsule'),
          menuIndicator('hidden'),
          tint(tintColor ?? COLORS.status.success),
          foregroundStyle(COLORS.text.primary),
          frame({ height })
        ]}
        onPrimaryAction={onPress}
      >
        <Section>{MAIN_STATUSES.map(renderStatus)}</Section>

        <Section>{PAUSED_STATUSES.map(renderStatus)}</Section>

        {!!status && (
          <Section>
            <MenuButton
              label='Remove from Library'
              systemImage='trash'
              role='destructive'
              modifiers={[tint(COLORS.status.error)]}
              onPress={removeFromLibrary}
            />
          </Section>
        )}
      </Menu>
    </Host>
  )
}
