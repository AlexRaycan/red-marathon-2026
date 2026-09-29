import type { DiscoverItemResponse } from '@app/api'
import { SPACINGS } from '@app/tokens'
import { useWindowDimensions } from 'react-native'

import { Carousel } from '@/components/carousel'
import { TitleCard } from '@/components/titles'

interface Props {
  title?: string
  items: DiscoverItemResponse[]
  cardWidth?: number
  onPress?: () => void
}

const getCardWidth = (windowWidth: number) => {
  const cardCountPerScreen = Math.trunc(windowWidth / 110)
  const cardCountMultiplier = cardCountPerScreen * 1.05
  const totalGap = SPACINGS[3] * (cardCountPerScreen + 1)

  return (windowWidth - totalGap) / cardCountMultiplier
}

export function TitleSlider({
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
          onPress={() => console.warn({ ...item })}
        />
      ))}
    </Carousel>
  )
}
