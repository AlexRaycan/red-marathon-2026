import type { DiscoverDetailsResponse } from '@app/api'
import { COLORS, FONT_SIZE, LAYOUT, RADIUS, SPACINGS } from '@app/tokens'
import BottomSheet, { BottomSheetView } from '@expo/ui/community/bottom-sheet'
import { type RefObject, useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, GlassContainer, Input, ScreenTitle } from '@/components/ui'

import { Carousel } from '@/components/carousel'
import { TitleCard } from '@/components/titles'

import { FriendCard } from './FriendCard'
import { SHARE_FRIENDS_MOCK_DATA } from './share-friends.mock.data'

interface ShareBottomSheetProps {
  title: DiscoverDetailsResponse
  ref: RefObject<BottomSheet | null>
}

export function ShareBottomSheet({
  title,
  ref,
  ...props
}: ShareBottomSheetProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [inputText, setInputText] = useState('')

  const titleName = title.name
  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null

  const heading = `${titleName}${year ? ` (${year})` : ''}`

  const toggleFriends = (id: string) => {
    setSelectedIds(ids =>
      ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]
    )
  }

  const recipients = SHARE_FRIENDS_MOCK_DATA.filter(friend =>
    selectedIds.includes(friend.id)
  )
    .map(friend => friend.name)
    .join(', ')

  const handleInputTextChange = (text: string) => {
    setInputText(text)
  }

  const onCloseSpread = useCallback(() => {
    ref.current?.dismiss()
  }, [ref])

  const handleClose = () => {
    setSelectedIds([])
    setInputText('')
  }

  const handleShare = useCallback(() => {
    const text = inputText
    console.log('To:', recipients, '\nText:', text)
    // send share request

    onCloseSpread()
  }, [recipients, inputText, onCloseSpread])

  return (
    <BottomSheet
      {...props}
      ref={ref}
      index={-1}
      enablePanDownToClose
      enableDynamicSizing
      onClose={handleClose}
    >
      <BottomSheetView style={styles.view}>
        <View style={[styles.title]}>
          <ScreenTitle style={[styles.inset]}>
            Share with your friends
          </ScreenTitle>
          <View style={styles.divider} />
        </View>

        <View style={styles.content}>
          <Carousel
            title={heading}
            titleStyle={styles.carouselTitle}
            beforeTitle={
              <TitleCard
                title={title}
                width={30}
                borderRadius={RADIUS.sm}
              />
            }
          >
            {SHARE_FRIENDS_MOCK_DATA.map(friend => (
              <FriendCard
                key={friend.id}
                name={friend.name}
                avatarUrl={friend.avatarUrl}
                isSelected={selectedIds.includes(friend.id)}
                onPress={() => toggleFriends(friend.id)}
              />
            ))}
          </Carousel>

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
          <GlassContainer>
            <View style={[styles.inset, styles.buttonsContainer]}>
              <Button
                label='Send'
                tintColor={COLORS.status.success}
                size='lg'
                onPress={handleShare}
              />
              <Button
                label='Cancel'
                variant='secondary'
                size='lg'
                onPress={onCloseSpread}
              />
            </View>
          </GlassContainer>
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
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
  carouselTitle: {
    fontSize: FONT_SIZE.base
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border
  },
  form: {
    gap: SPACINGS[2]
    // paddingBottom: SPACINGS[4]
  },
  recipients: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.muted
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: SPACINGS[2]
  }
})
