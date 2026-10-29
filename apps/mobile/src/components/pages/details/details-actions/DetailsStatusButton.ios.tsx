import {
  type DiscoverDetailsResponse,
  type TitleListItemResponseType
} from '@app/api'
import { useLibraryStatus } from '@app/hooks'
import { useRatingStore } from '@app/store'
import { COLORS } from '@app/tokens'
import type { TLibraryStatus } from '@app/types'
import { useLocalSearchParams } from 'expo-router'
import { Check, LogIn, type LucideIcon, Pen } from 'lucide-react-native'
import { type ColorValue } from 'react-native'

import { Button } from '@/components/ui'

import { useProtectedPush } from '@/hooks'

import { DetailsLongPress } from './DetailsLongPress.ios'
import { LIBRARY_ACTION_ICONS } from './detials-actions.data'

interface DetailsStatusButtonProps {
  title: Pick<DiscoverDetailsResponse, 'key' | 'type'>
  accentColor?: ColorValue
  icon?: LucideIcon
  isIconOnly?: boolean
  openSheet?: () => void
}

export function DetailsStatusButton({
  title,
  accentColor,
  icon: Icon,
  isIconOnly,
  openSheet
}: DetailsStatusButtonProps) {
  const { type } = useLocalSearchParams<{
    type: TitleListItemResponseType
  }>()

  const {
    isAuthenticated,
    action,
    isCompletedStatus,
    status,
    setStatus,
    removeFromLibrary
  } = useLibraryStatus(title.key)

  const pushProtected = useProtectedPush()

  const userRating = useRatingStore(state => state.userReviews?.[title.key])

  const reviewButtonLabel = `${userRating?.text ? 'Edit' : 'Write'} a Review`
  const libraryStatusButtonLabel = isCompletedStatus
    ? reviewButtonLabel
    : action.label

  const baseIcon = status ? Check : (Icon ?? LIBRARY_ACTION_ICONS.PLANNED)
  const statusIcon = isCompletedStatus
    ? Pen
    : LIBRARY_ACTION_ICONS[action.nextStatus]

  const actionIcon = type ? statusIcon : baseIcon
  const icon = isAuthenticated ? actionIcon : LogIn

  const statusColor = isCompletedStatus ? COLORS.status.success : accentColor

  const selectStatus = (nextStatus: TLibraryStatus) => {
    if (!isCompletedStatus) {
      setStatus(nextStatus)

      return
    }

    if (type) {
      openSheet?.()
    }
  }

  const redirect = () => {
    pushProtected({
      pathname: '/title/[type]/[key]',
      params: {
        type: title.type,
        key: title.key
      }
    })
  }

  const handleStatusPress = () => {
    if (!isAuthenticated) {
      redirect()

      return
    }

    // !type - on the home screen
    if (!type) {
      if (!status) setStatus('PLANNED')

      if (status === 'PLANNED') removeFromLibrary()

      return
    }

    selectStatus(action.nextStatus)
  }

  const button = (
    <Button
      icon={icon}
      {...(isCompletedStatus && { withFillIcon: !!userRating?.text })}
      {...(!isIconOnly
        ? {
            label: isAuthenticated ? libraryStatusButtonLabel : 'Go to Login',
            tintColor: isAuthenticated ? statusColor : COLORS.status.success,
            fullWidth: true,
            size: 'lg'
          }
        : { variant: 'secondary' })}
      onPress={handleStatusPress}
    />
  )

  if (!isAuthenticated || isIconOnly) return button

  return (
    <DetailsLongPress
      status={status}
      nextStatus={action.nextStatus}
      label={isAuthenticated ? libraryStatusButtonLabel : 'Go to Login'}
      size={isIconOnly ? 'md' : 'lg'}
      tintColor={isAuthenticated ? statusColor : COLORS.status.success}
      selectStatus={selectStatus}
      removeFromLibrary={removeFromLibrary}
      onPrimaryAction={handleStatusPress}
    >
      {button}
    </DetailsLongPress>
  )
}
