import { FONT_SIZE } from '@app/tokens'
import type { ReactNode } from 'react'
import { StyleSheet } from 'react-native'

import { Carousel } from '@/components/ui'

import { FriendCard } from './FriendCard'
import { SHARE_FRIENDS_MOCK_DATA } from './share-friends.mock.data'

interface FriendCarouselProps {
  heading?: string
  titlePreview?: ReactNode
  selectedIds: string[]
  setSelectedIds: (ids: string) => void
}

export function FriendCarousel({
  heading,
  titlePreview,
  selectedIds,
  setSelectedIds
}: FriendCarouselProps) {
  return (
    <Carousel
      title={heading}
      titleStyle={styles.carouselTitle}
      beforeTitle={titlePreview}
    >
      {SHARE_FRIENDS_MOCK_DATA.map(friend => (
        <FriendCard
          key={friend.id}
          name={friend.name}
          avatarUrl={friend.avatarUrl}
          isSelected={selectedIds.includes(friend.id)}
          onPress={() => setSelectedIds(friend.id)}
        />
      ))}
    </Carousel>
  )
}

const styles = StyleSheet.create({
  carouselTitle: {
    fontSize: FONT_SIZE.base
  }
})
