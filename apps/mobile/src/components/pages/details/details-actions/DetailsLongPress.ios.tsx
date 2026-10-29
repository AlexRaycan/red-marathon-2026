import type { LibraryEntryResponseStatus } from '@app/api'
import { STATUS_LABELS } from '@app/constants'
import { COLORS, FONT_SIZE } from '@app/tokens'
import type { TButtonSize, TNextLibraryStatus } from '@app/types'
import {
  Host,
  Label,
  Menu,
  Button as MenuButton,
  type MenuProps,
  type RNHostViewProps,
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
import type { GlassViewProps } from 'expo-glass-effect'

import {
  ACTION_SYMBOLS,
  MAIN_STATUSES,
  PAUSED_STATUSES,
  STATUS_SYMBOLS
} from './detials-actions.data'

interface DetailsLongPressProps
  extends
    Pick<RNHostViewProps, 'children'>,
    Pick<MenuProps, 'onPrimaryAction'>,
    Pick<GlassViewProps, 'tintColor'> {
  label: string
  status: LibraryEntryResponseStatus | null
  nextStatus: TNextLibraryStatus
  size?: TButtonSize
  selectStatus: (item: LibraryEntryResponseStatus) => void
  removeFromLibrary: () => void
}

export function DetailsLongPress({
  label,
  status,
  nextStatus,
  size = 'md',
  tintColor,
  selectStatus,
  removeFromLibrary,
  ...props
}: DetailsLongPressProps) {
  const height = size === 'md' ? 44 : 56

  const renderStatus = (item: LibraryEntryResponseStatus) => (
    <Toggle
      key={item}
      label={STATUS_LABELS[item]}
      systemImage={STATUS_SYMBOLS[item]}
      isOn={item === status}
      modifiers={[tint(COLORS.text.primary)]}
      onIsOnChange={() => selectStatus(item)}
    />
  )

  // DOC: Android `DropdownMenu`
  return (
    <Host style={{ height }}>
      <Menu
        label={
          <Label
            title={label}
            systemImage={ACTION_SYMBOLS[nextStatus]}
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
        {...props}
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
