import type { DiscoverDetailsResponse } from '@app/api'
import { COLORS, FONT_SIZE, LAYOUT, SPACINGS } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { type RefObject, useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { BottomSheetWindow, Input, ScreenTitle } from '@/components/ui'

import { FriendCarousel } from '@/components/pages/details/share/FriendCarousel'

import { useSelectFriends } from '@/hooks/useSelectFriends'

interface ShareBottomSheetProps {
  title: DiscoverDetailsResponse
  ref: RefObject<BottomSheet | null>
}

export function ShareBottomSheet({
  title,
  ref,
  ...props
}: ShareBottomSheetProps) {
  const { selectedIds, setSelectedIds, clearSelectedIds, recipients } =
    useSelectFriends()

  const [inputText, setInputText] = useState('')

  const handleInputTextChange = (text: string) => {
    setInputText(text)
  }

  const handleClose = () => {
    clearSelectedIds()
    setInputText('')
  }

  const handleShare = useCallback(() => {
    const text = inputText
    console.log('To:', recipients, '\nText:', text)
    // send share request
  }, [recipients, inputText])

  const isSubmitButtonDisabled =
    inputText.trim().length === 0 || selectedIds.length === 0

  return (
    <BottomSheetWindow
      ref={ref}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      onSubmit={handleShare}
      onClose={handleClose}
      {...props}
    >
      <View style={[styles.title]}>
        <ScreenTitle style={[styles.inset]}>
          Share with your friends
        </ScreenTitle>
        <View style={styles.divider} />
      </View>

      <View style={styles.content}>
        <FriendCarousel
          title={title}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />

        <View style={[styles.form]}>
          <Text
            style={[styles.inset, styles.recipients]}
            numberOfLines={1}
          >
            To: {recipients}
          </Text>

          <View style={[styles.inset]}>
            <Input
              placeholder='Check this out!'
              multiline
              tintColor={'rgba(255, 255, 255, 0.08)'}
              onChangeText={handleInputTextChange}
            />
          </View>
        </View>
      </View>
    </BottomSheetWindow>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: SPACINGS[4]
  },
  inset: {
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  title: {
    paddingTop: SPACINGS[2],
    paddingBottom: StyleSheet.hairlineWidth,
    gap: SPACINGS[4]
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border
  },
  form: {
    gap: SPACINGS[2]
  },
  recipients: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.muted
  }
})
