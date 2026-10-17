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
import { Bookmark, Pen, Star } from 'lucide-react-native'
import { useCallback, useRef } from 'react'
import { type ColorValue, StyleSheet, View } from 'react-native'

import { Button, GlassContainer, LoginToButton } from '@/components/ui'

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

  const handleStatusPress = useCallback(() => {
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
        action: BOTTOM_SHEET_ACTIONS.review
      }
    })
  }, [
    action,
    isAuthenticated,
    isStatusCompleted,
    open,
    pushProtected,
    setStatus,
    title.key,
    title.type
  ])

  useBottomSheetAction(sheetRef, 'review', isAuthenticated)

  return (
    <>
      <GlassContainer>
        <View style={[styles.baseContainer, styles.actionButtonContainer]}>
          {isAuthenticated ? (
            <Button
              label={libraryStatusButtonLabel}
              tintColor={
                isStatusCompleted ? COLORS.status.success : accentColor
              }
              icon={
                isStatusCompleted
                  ? Pen
                  : LIBRARY_ACTION_ICONS[action.nextStatus]
              }
              {...(isStatusCompleted && { filledIcon: !!userRating?.text })}
              size='lg'
              fullWidth
              onPress={handleStatusPress}
            />
          ) : (
            <LoginToButton
              onPress={() =>
                pushProtected({
                  pathname: '/title/[type]/[key]',
                  params: {
                    type: title.type,
                    key: title.key
                  }
                })
              }
            />
          )}

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
              filledIcon={!!userRating}
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
