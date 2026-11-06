import type { DiscoverDetailsResponse } from '@app/api'
import { REVIEWS_RATING } from '@app/constants'
import { useLibraryStatus } from '@app/hooks'
import { useRatingStore } from '@app/store'
import { COLORS, FONT_SIZE, LAYOUT, SPACINGS } from '@app/tokens'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { FolderPlus, Star } from 'lucide-react-native'
import { useRef } from 'react'
import { type ColorValue, StyleSheet, Text, View } from 'react-native'

import { Button, GlassContainer } from '@/components/ui'

import { CollectionAddToButton } from '@/components/elements'

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
  const {
    isAuthenticated,
    action,
    status,
    isCompletedStatus,
    rating,
    progress
  } = useLibraryStatus(title.key)

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
        action: BOTTOM_SHEET_ACTIONS.review
      }
    })
  }

  const shouldOpenSheet = isCompletedStatus || action.nextStatus === 'COMPLETED'
  useBottomSheetAction(sheetRef, 'review', isAuthenticated && shouldOpenSheet)

  console.log(status, progress)

  return (
    <>
      <GlassContainer>
        <View style={[styles.baseContainer, styles.actionButtonContainer]}>
          <DetailsStatusButton
            title={title}
            accentColor={accentColor}
            openSheet={open}
          />

          {status === 'IN_PROGRESS' && !!progress && (
            <Text style={styles.progress}>Progress: {progress}</Text>
          )}

          <View style={[styles.actionButtonGroup]}>
            <CollectionAddToButton
              titleKey={title.key}
              options={{
                icon: FolderPlus,
                lable: 'Add to Collection',
                fullWidth: true
              }}
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
  progress: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.xs,
    textAlign: 'center'
  },
  actionButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[3]
  }
})
