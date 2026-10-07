import type { DiscoverDetailsResponse } from '@app/api'
import { FONT_SIZE, RADIUS } from '@app/tokens'
import { StyleSheet } from 'react-native'

import { Carousel } from '@/components/carousel'
import { FriendCard } from '@/components/pages/details/share/FriendCard'
import { SHARE_FRIENDS_MOCK_DATA } from '@/components/pages/details/share/share-friends.mock.data'
import { TitleCard } from '@/components/titles'

interface FriendCarouselProps {
  title: DiscoverDetailsResponse
  selectedIds: string[]
  setSelectedIds: (ids: string) => void
}

export function FriendCarousel({
  title,
  selectedIds,
  setSelectedIds
}: FriendCarouselProps) {
  const titleName = title.name
  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null

  const heading = `${titleName}${year ? ` (${year})` : ''}`

  return (
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
