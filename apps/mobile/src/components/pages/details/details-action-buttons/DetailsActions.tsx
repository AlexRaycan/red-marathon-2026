import type {
  DiscoverDetailsResponse,
  DiscoverDetailsResponseType
} from '@app/api'
import { LAYOUT, SPACINGS } from '@app/tokens'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { Bookmark, Star } from 'lucide-react-native'
import { useCallback, useRef } from 'react'
import { type ColorValue, StyleSheet, View } from 'react-native'

import { Button, GlassContainer, LoginToButton } from '@/components/ui'

import { LibraryStatusButton } from '@/components/pages/details'

import { useBottomSheetAction } from '@/hooks/useBottomSheetAction'

import { ReviewBottomSheet } from '../review-form'

import { BOTTOM_SHEET_ACTIONS } from '@/constants'
import { useBottomSheetControl, useProtectedPush } from '@/hooks'

interface DetailsActionButtonsProps {
  title: Pick<
    DiscoverDetailsResponse,
    'type' | 'coverUrl' | 'name' | 'releaseDate' | 'key'
  >
  accentColor?: ColorValue
  isAuthenticated?: boolean
}

export function DetailsActions({
  title,
  accentColor,
  isAuthenticated
}: DetailsActionButtonsProps) {
  const titleKey = title?.key

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
            <LibraryStatusButton
              titleKey={titleKey}
              tintColor={accentColor}
              openSheet={open}
            />
          ) : (
            <LoginToButton
              tintColor={accentColor}
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
              label='Rate'
              variant='secondary'
              icon={Star}
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
function pushProtected(arg0: {
  pathname: string
  params: { type: DiscoverDetailsResponseType; key: string }
}) {
  throw new Error('Function not implemented.')
}
