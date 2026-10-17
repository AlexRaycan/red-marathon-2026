import type { DiscoverDetailsResponse, DiscoverItemResponse } from '@app/api'
import { router } from 'expo-router'

import { Carousel } from '@/components/ui'

import { TitleCard } from './title-card'

interface Props {
  title?: string
  items: DiscoverItemResponse[] | DiscoverDetailsResponse[]
  cardWidth?: number
  onPress?: () => void
}

export function TitlesCarousel({
  items,
  cardWidth: customCardWidth,
  ...rest
}: Props) {
  return (
    <Carousel {...rest}>
      {items.map(item => (
        <TitleCard
          key={item.key}
          type={item.type}
          coverUrl={item.coverUrl}
          withBadge
          onPress={() => router.push(`/title/${item?.type}/${item?.key}`)}
        />
      ))}
    </Carousel>
  )
}
