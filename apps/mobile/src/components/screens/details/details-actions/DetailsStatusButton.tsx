import { type DiscoverDetailsResponse } from '@app/api'
import { useLibraryStatus } from '@app/hooks'
import { useRatingStore } from '@app/store'
import { COLORS } from '@app/tokens'
import type { TLibraryStatus } from '@app/types'
import { Check, LogIn, type LucideIcon, Pen } from 'lucide-react-native'
import { type ColorValue } from 'react-native'

import { Button } from '@/components/ui'

import { useProtectedPush } from '@/hooks'

import { HAPTIC_TRIGGERS } from '@/lib'

import { DetailsLongPress } from './DetailsLongPress'
import { LIBRARY_ACTION_ICONS } from './details-actions.data'

interface DetailsStatusButtonProps {
  title: Pick<DiscoverDetailsResponse, 'key' | 'type'>
  accentColor?: ColorValue
  icon?: LucideIcon
  isIconOnly?: boolean
  isFromHomePage?: boolean
  openSheet?: () => void
}

export function DetailsStatusButton({
  title,
  accentColor,
  icon: Icon,
  isIconOnly,
  isFromHomePage,
  openSheet
}: DetailsStatusButtonProps) {
  const isDetailPage = !isFromHomePage

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

  const actionIcon = isDetailPage ? statusIcon : baseIcon
  const icon = isAuthenticated ? actionIcon : LogIn

  const statusColor = isCompletedStatus ? COLORS.status.success : accentColor

  const selectStatus = (nextStatus: TLibraryStatus) => {
    const shouldOpenSheet = isDetailPage && nextStatus === 'COMPLETED'

    setStatus(nextStatus)

    // When user hits 'Mark as Completed' button
    if (
      !isCompletedStatus &&
      shouldOpenSheet &&
      userRating?.rating === undefined
    ) {
      openSheet?.()

      return
    }

    // When user hit 'Write/Edit review'
    if (shouldOpenSheet) {
      openSheet?.()

      return
    }
  }

  const redirect = () => {
    pushProtected({
      pathname: '/title/[key]',
      params: {
        key: title.key
      }
    })
  }

  const handleStatusPress = () => {
    void HAPTIC_TRIGGERS.selection()

    if (!isAuthenticated) {
      redirect()

      return
    }

    // !type - on the home screen
    if (!isDetailPage) {
      if (!status) setStatus('PLANNED')

      if (status === 'PLANNED') removeFromLibrary()

      return
    }

    selectStatus(action.nextStatus)
  }

  const renderButton = (onLongPress?: () => void) => (
    <Button
      icon={icon}
      {...(isCompletedStatus && {
        withFillIcon: isDetailPage && !!userRating?.text
      })}
      {...(!isIconOnly
        ? {
            label: isAuthenticated ? libraryStatusButtonLabel : 'Go to Login',
            tintColor: isAuthenticated ? statusColor : COLORS.status.success,
            fullWidth: true,
            size: 'lg'
          }
        : { variant: 'secondary' })}
      onPress={handleStatusPress}
      onLongPress={onLongPress}
    />
  )

  if (!isAuthenticated || isIconOnly) return renderButton()

  return (
    <DetailsLongPress
      status={status}
      nextStatus={action.nextStatus}
      label={isAuthenticated ? libraryStatusButtonLabel : 'Go to Login'}
      size={isIconOnly ? 'md' : 'lg'}
      tintColor={isAuthenticated ? statusColor : COLORS.status.success}
      renderTrigger={({ onLongPress }) => renderButton(onLongPress)}
      selectStatus={selectStatus}
      removeFromLibrary={removeFromLibrary}
      onPress={handleStatusPress}
    />
  )
}
