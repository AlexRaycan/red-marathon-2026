import type { DiscoverDetailsResponse, DiscoverItemResponse } from '@app/api'
import { router } from 'expo-router'

import { Carousel } from '@/components/ui'

import { TitleCard } from './title-card'

interface Props {
  title?: string
  titles: DiscoverItemResponse[] | DiscoverDetailsResponse[]
  cardWidth?: number
  onPress?: () => void
}

export function TitlesCarousel({
  titles,
  cardWidth: customCardWidth,
  ...rest
}: Props) {
  return (
    <Carousel {...rest}>
      {titles.map(title => (
        <TitleCard
          key={title.key}
          type={title.type}
          coverUrl={title.coverUrl}
          withBadge
          onPress={() => router.push(`/title/${title?.type}/${title?.key}`)}
        />
      ))}
    </Carousel>
  )
}
