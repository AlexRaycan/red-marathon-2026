import type { DiscoverDetailsResponse } from '@app/api'
import { useLibraryStatus } from '@app/hooks'
import { useRatingStore } from '@app/store'
import { COLORS } from '@app/tokens'
import { LogIn, Pen } from 'lucide-react-native'
import { type ColorValue } from 'react-native'

import { Button } from '@/components/ui'

import { useProtectedPush } from '@/hooks'

import { BOTTOM_SHEET_ACTIONS } from '@/constants'

import { LIBRARY_ACTION_ICONS } from './detials-actions.data'

interface DetailsStatusButtonProps {
  title: Pick<DiscoverDetailsResponse, 'key' | 'type'>
  accentColor?: ColorValue
  openSheet?: () => void
}

export function DetailsStatusButton({
  title,
  accentColor,
  openSheet
}: DetailsStatusButtonProps) {
  const { isAuthenticated, action, isCompletedStatus, setStatus } =
    useLibraryStatus(title.key)
  const pushProtected = useProtectedPush()

  const userRating = useRatingStore(state => state.userReviews?.[title.key])

  const reviewButtonLabel = `${userRating?.text ? 'Edit' : 'Write'} a Review`
  const libraryStatusButtonLabel = isCompletedStatus
    ? reviewButtonLabel
    : action.label

  const statusIcon = isCompletedStatus
    ? Pen
    : LIBRARY_ACTION_ICONS[action.nextStatus]
  const statusColor = isCompletedStatus ? COLORS.status.success : accentColor

  const handleStatusPress = () => {
    if (isAuthenticated) {
      if (!isCompletedStatus) setStatus(action.nextStatus)

      if (isCompletedStatus || action.nextStatus === 'COMPLETED') {
        openSheet?.()
      }

      return
    }

    pushProtected({
      pathname: '/title/[type]/[key]',
      params: {
        type: title.type,
        key: title.key,
        action:
          isCompletedStatus || action.nextStatus === 'COMPLETED'
            ? BOTTOM_SHEET_ACTIONS.review
            : undefined
      }
    })
  }

  return (
    <Button
      label={isAuthenticated ? libraryStatusButtonLabel : 'Go to Login'}
      tintColor={isAuthenticated ? statusColor : COLORS.status.success}
      icon={isAuthenticated ? statusIcon : LogIn}
      {...(isCompletedStatus && { withFillIcon: !!userRating?.text })}
      size='lg'
      fullWidth
      onPress={handleStatusPress}
    />
  )
}
