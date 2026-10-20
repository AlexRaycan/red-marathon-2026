import type {
  DiscoverDetailsResponse,
  TitleListItemResponseType
} from '@app/api'
import { useLibraryStatus } from '@app/hooks'
import { useRatingStore } from '@app/store'
import { COLORS } from '@app/tokens'
import { useLocalSearchParams } from 'expo-router'
import { LogIn, type LucideIcon, Pen } from 'lucide-react-native'
import { type ColorValue } from 'react-native'

import { Button } from '@/components/ui'

import { useProtectedPush } from '@/hooks'

import { BOTTOM_SHEET_ACTIONS } from '@/constants'

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

  const { isAuthenticated, action, isCompletedStatus, setStatus } =
    useLibraryStatus(title.key)
  const pushProtected = useProtectedPush()

  const userRating = useRatingStore(state => state.userReviews?.[title.key])

  const reviewButtonLabel = `${userRating?.text ? 'Edit' : 'Write'} a Review`
  const libraryStatusButtonLabel = isCompletedStatus
    ? reviewButtonLabel
    : action.label

  const baseIcon = Icon ?? LogIn
  const statusIcon = isCompletedStatus
    ? Pen
    : LIBRARY_ACTION_ICONS[action.nextStatus]
  const statusColor = isCompletedStatus ? COLORS.status.success : accentColor

  const redirect = () => {
    // TODO: solve problem when user not login and action is undefined because it
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
  const handleStatusPress = () => {
    if (isAuthenticated) {
      if (!isCompletedStatus) setStatus(action.nextStatus)

      if (isCompletedStatus || action.nextStatus === 'COMPLETED') {
        if (type) {
          openSheet?.()
        } else {
          redirect()
        }
      }

      return
    }

    redirect()
  }

  return (
    <Button
      icon={isAuthenticated ? statusIcon : baseIcon}
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
}
