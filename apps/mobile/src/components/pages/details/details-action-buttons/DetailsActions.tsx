import type { DiscoverDetailsResponse } from '@app/api'
import { LAYOUT, SPACINGS } from '@app/tokens'
import BottomSheet from '@expo/ui/community/bottom-sheet'
import { Bookmark, Star } from 'lucide-react-native'
import { useRef } from 'react'
import { type ColorValue, StyleSheet, View } from 'react-native'

import { Button, GlassContainer, LoginToButton } from '@/components/ui'

import { LibraryStatusButton } from '@/components/pages/details'

import { ReviewBottomSheet } from '../review-form'

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

  const openSheet = () => {
    sheetRef.current?.snapToIndex(0)
  }

  return (
    <>
      <GlassContainer>
        <View style={[styles.baseContainer, styles.actionButtonContainer]}>
          {isAuthenticated ? (
            <LibraryStatusButton
              titleKey={titleKey}
              tintColor={accentColor}
              openSheet={openSheet}
            />
          ) : (
            <LoginToButton tintColor={accentColor} />
          )}

          {isAuthenticated && (
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
                onPress={openSheet}
              />
            </View>
          )}
        </View>
      </GlassContainer>

      <ReviewBottomSheet
        ref={sheetRef}
        title={title}
        isAuthenticated={isAuthenticated}
      />
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
