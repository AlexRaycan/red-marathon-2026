import type { MyLibraryStatusResponseStatus } from '@app/api'
import { ADD_TO_LIBRARY_ACTION, LIBRARY_STATUS_ACTIONS } from '@app/constants'
import { COLORS } from '@app/tokens'
import { type ColorValue } from 'react-native'

import { Button } from '@/components/ui'

import { LIBRARY_ACTION_ICONS } from './library-status.data'

interface LibraryStatusButtonProps {
  status: MyLibraryStatusResponseStatus | null
  tintColor?: ColorValue
  setStatus: (status: MyLibraryStatusResponseStatus) => void
  openSheet?: () => void
}

export function LibraryStatusButton({
  status,
  setStatus,
  tintColor,
  openSheet
}: LibraryStatusButtonProps) {
  const action =
    status && status !== 'COMPLETED'
      ? LIBRARY_STATUS_ACTIONS[status]
      : ADD_TO_LIBRARY_ACTION

  const onPress = () => {
    setStatus(action.nextStatus)

    if (action.nextStatus === 'COMPLETED') {
      openSheet?.()
    }
  }

  return (
    <Button
      label={action.label}
      icon={LIBRARY_ACTION_ICONS[action.nextStatus]}
      size='lg'
      tintColor={
        action.nextStatus === 'COMPLETED' ? COLORS.status.success : tintColor
      }
      onPress={onPress}
    />
  )
}
