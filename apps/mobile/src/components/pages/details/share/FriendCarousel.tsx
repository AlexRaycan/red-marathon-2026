import type { DiscoverDetailsResponse } from '@app/api'
import { FONT_SIZE } from '@app/tokens'
import { StyleSheet } from 'react-native'

import { Carousel } from '@/components/carousel'
import { FriendCard } from '@/components/pages/details/share/FriendCard'
import { SHARE_FRIENDS_MOCK_DATA } from '@/components/pages/details/share/share-friends.mock.data'
import { TitleCardPreviewSmall } from '@/components/titles'

interface FriendCarouselProps {
  title: Pick<
    DiscoverDetailsResponse,
    'type' | 'coverUrl' | 'name' | 'releaseDate'
  >
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
      beforeTitle={<TitleCardPreviewSmall title={title} />}
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
