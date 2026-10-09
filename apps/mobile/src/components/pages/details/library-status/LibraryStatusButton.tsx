import { ADD_TO_LIBRARY_ACTION, LIBRARY_STATUS_ACTIONS } from '@app/constants'
import { useLibraryStatus } from '@app/hooks'
import { router } from 'expo-router'
import { type ColorValue } from 'react-native'

import { Button } from '@/components/ui'

import { LIBRARY_ACTION_ICONS } from './library-status.data'

interface LibraryStatusButtonProps {
  titleKey: string
  tintColor?: ColorValue
  openSheet?: () => void
}

export function LibraryStatusButton({
  titleKey,
  tintColor,
  openSheet
}: LibraryStatusButtonProps) {
  // TODO: add a rating button
  const { isAuthenticated, status, rating, setStatus } =
    useLibraryStatus(titleKey)

  if (status === 'COMPLETED') {
    openSheet?.()
  }

  const action =
    status && status !== 'COMPLETED'
      ? LIBRARY_STATUS_ACTIONS[status]
      : ADD_TO_LIBRARY_ACTION

  const onPress = () => {
    if (!isAuthenticated) {
      router.push('/login')

      return
    }

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
      tintColor={tintColor}
      onPress={onPress}
    />
  )
}
