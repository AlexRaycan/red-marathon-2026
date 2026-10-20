import type { DiscoverDetailsResponse } from '@app/api'
import { REVIEWS_RATING } from '@app/constants'
import { useLibraryStatus } from '@app/hooks'
import { useRatingStore } from '@app/store'
import { LAYOUT, SPACINGS } from '@app/tokens'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { Bookmark, Star } from 'lucide-react-native'
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

import { DetailsStatusButton } from './DetailsStatusButton'

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
  const { isAuthenticated, action, isCompletedStatus, rating } =
    useLibraryStatus(title.key)

  // TODO: refactor

  const userRating = useRatingStore(state => state.userReviews?.[title.key])

  const sheetRef = useRef<BottomSheet>(null)

  const pushProtected = useProtectedPush()
  const { open } = useBottomSheetControl(sheetRef)

  const handleReviewButton = () => {
    if (isAuthenticated) {
      open()

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

  // TODO: add prop shoulOpen base on status and action
  useBottomSheetAction(sheetRef, 'review', isAuthenticated)

  return (
    <>
      <GlassContainer>
        <View style={[styles.baseContainer, styles.actionButtonContainer]}>
          <DetailsStatusButton
            title={title}
            accentColor={accentColor}
            openSheet={open}
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
              onPress={handleReviewButton}
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
