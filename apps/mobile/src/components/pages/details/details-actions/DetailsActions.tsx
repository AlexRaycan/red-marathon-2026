import type { DiscoverDetailsResponse } from '@app/api'
import { REVIEWS_RATING } from '@app/constants'
import { useLibraryStatus } from '@app/hooks'
import { useRatingStore } from '@app/store'
import { LAYOUT, SPACINGS } from '@app/tokens'
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

import { LibraryStatusButton } from '../library-status'
import { ReviewBottomSheet } from '../review-form'

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

  const userRating = useRatingStore(state => state.userReviews?.[title.key])

  const sheetRef = useRef<BottomSheet>(null)

  const pushProtected = useProtectedPush()
  const { open } = useBottomSheetControl(sheetRef)

  const handleRatePress = useCallback(() => {
    if (isAuthenticated) {
      open()

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
  }, [isAuthenticated, open, pushProtected, title])

  useBottomSheetAction(sheetRef, 'review', isAuthenticated)

  return (
    <>
      <GlassContainer>
        <View style={[styles.baseContainer, styles.actionButtonContainer]}>
          {isAuthenticated ? (
            status === 'COMPLETED' ? (
              <LibraryStatusButton
                tintColor={accentColor}
                openSheet={open}
                status={status}
                setStatus={setStatus}
              />
            ) : (
              <Button
                label={`${userRating ? 'Edit' : 'Write'} a Review`}
                tintColor={accentColor}
                icon={Pen}
                size='lg'
                fullWidth
                onPress={handleRatePress}
              />
            )
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
              filledIcon={!!rating}
              fullWidth
              onPress={handleRatePress}
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
