import type { DiscoverDetailsResponse, DiscoverItemResponse } from '@app/api'
import { getCardWidth } from '@app/utils'
import { router } from 'expo-router'
import { useWindowDimensions } from 'react-native'

import { Carousel } from '@/components/carousel'

import { TitleCard } from './title-card'

interface Props {
  title?: string
  items: DiscoverItemResponse[] | DiscoverDetailsResponse[]
  cardWidth?: number
  onPress?: () => void
}

export function TitlesSlider({
  items,
  cardWidth: customCardWidth,
  ...rest
}: Props) {
  const { width: windowWidth } = useWindowDimensions()

  const cardWidth = customCardWidth ?? getCardWidth(windowWidth)

  return (
    <Carousel {...rest}>
      {items.map(item => (
        <TitleCard
          key={item.key}
          title={item}
          width={cardWidth}
          withBadge
          onPress={() => router.push(`/title/${item?.type}/${item?.key}`)}
        />
      ))}
    </Carousel>
  )
}
