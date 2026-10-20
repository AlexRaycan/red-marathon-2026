import type { DiscoverDetailsResponse } from '@app/api'
import {
  ADD_TO_LIBRARY_ACTION,
  LIBRARY_STATUS_ACTIONS,
  REVIEWS_RATING
} from '@app/constants'
import { useLibraryStatus } from '@app/hooks'
import { useRatingStore } from '@app/store'
import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { Bookmark, LogIn, Pen, Star } from 'lucide-react-native'
import { useRef } from 'react'
import { type ColorValue, StyleSheet, View } from 'react-native'

import { Button, GlassContainer } from '@/components/ui'

import {
  useBottomSheetAction,
  useBottomSheetControl,
  useProtectedPush
} from '@/hooks'

import { BOTTOM_SHEET_ACTIONS } from '@/constants'

import { ReviewBottomSheet } from '../review-form'

import { LIBRARY_ACTION_ICONS } from './detials-actions.data'

interface DetailsActionButtonsProps {
  title: Pick<
    DiscoverDetailsResponse,
    'type' | 'coverUrl' | 'name' | 'releaseDate' | 'key'
  >
  accentColor?: ColorValue
}

export function DetailsActions({
  title,
  accentColor
}: DetailsActionButtonsProps) {
  const { isAuthenticated, status, rating, setStatus } = useLibraryStatus(
    title.key
  )

  // TODO: refactor

  const action =
    status && status !== 'COMPLETED'
      ? LIBRARY_STATUS_ACTIONS[status]
      : ADD_TO_LIBRARY_ACTION
  const userRating = useRatingStore(state => state.userReviews?.[title.key])

  const isStatusCompleted = status === 'COMPLETED'

  const reviewButtonLabel = `${userRating?.text ? 'Edit' : 'Write'} a Review`
  const libraryStatusButtonLabel = isStatusCompleted
    ? reviewButtonLabel
    : action.label

  const sheetRef = useRef<BottomSheet>(null)

  const pushProtected = useProtectedPush()
  const { open } = useBottomSheetControl(sheetRef)

  const handleStatusPress = () => {
    if (isAuthenticated) {
      if (!isStatusCompleted) setStatus(action.nextStatus)

      if (isStatusCompleted || action.nextStatus === 'COMPLETED') {
        open()
      }

      return
    }

    pushProtected({
      pathname: '/title/[type]/[key]',
      params: {
        type: title.type,
        key: title.key,
        action:
          isStatusCompleted || action.nextStatus === 'COMPLETED'
            ? BOTTOM_SHEET_ACTIONS.review
            : undefined
      }
    })
  }

  useBottomSheetAction(sheetRef, 'review', isAuthenticated)

  const statusIcon = isStatusCompleted
    ? Pen
    : LIBRARY_ACTION_ICONS[action.nextStatus]
  const statusColor = isStatusCompleted ? COLORS.status.success : accentColor

  return (
    <>
      <GlassContainer>
        <View style={[styles.baseContainer, styles.actionButtonContainer]}>
          <Button
            label={isAuthenticated ? libraryStatusButtonLabel : 'Go to Login'}
            tintColor={isAuthenticated ? statusColor : COLORS.status.success}
            icon={isAuthenticated ? statusIcon : LogIn}
            {...(isStatusCompleted && { withFillIcon: !!userRating?.text })}
            size='lg'
            fullWidth
            onPress={handleStatusPress}
          />

          <View style={[styles.actionButtonGroup]}>
            <Button
              label='Add to Watchlist'
              variant='secondary'
              icon={Bookmark}
              fullWidth
              onPress={() => console.log('Pressed Add to Watchlist')}
            />

            <Button
              label={rating ? `${rating}/${REVIEWS_RATING.max}` : 'Rate'}
              variant='secondary'
              icon={Star}
              withFillIcon={!!userRating}
              fullWidth
              onPress={handleStatusPress}
            />
          </View>
        </View>
      </GlassContainer>

      {isAuthenticated && (
        <ReviewBottomSheet
          ref={sheetRef}
          title={title}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  baseContainer: {
    marginHorizontal: LAYOUT['space-horizontal']
  },
  actionButtonContainer: {
    gap: SPACINGS[4]
  },
  actionButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[3]
  }
})
