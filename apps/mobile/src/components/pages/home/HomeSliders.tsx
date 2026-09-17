import { SPACINGS } from '@app/tokens'

import { Carousel } from '@/components/carousel/Carousel'
import { TitleCard } from '@/components/title-card/TitleCard'

import { SAMPLE_TITLES } from '@/app/(tabbar)'

interface Props {
  windowWidth: number
}

function calculateCardWidth(windowWidth: number): number {
  const cardCountPerScreen = Math.trunc(windowWidth / 110)
  const cardCountMultiplier = cardCountPerScreen * 1.05
  const totalGap = SPACINGS[3] * (cardCountPerScreen + 1)

  return (windowWidth - totalGap) / cardCountMultiplier
}

function HomeTopPickSlider({ windowWidth }: Props) {
  const cardWidth = calculateCardWidth(windowWidth)

  return (
    <Carousel
      title={'Top picks for you'}
      onPress={() => console.debug('Top picks for you!')}
    >
      {SAMPLE_TITLES.map(item => (
        <TitleCard
          key={item.id}
          title={item}
          width={cardWidth}
          onPress={() => console.warn({ ...item })}
        />
      ))}
    </Carousel>
  )
}

function HomePopularNowSlider({ windowWidth }: Props) {
  const cardWidth = calculateCardWidth(windowWidth)

  return (
    <Carousel
      title={'Popular now'}
      onPress={() => console.debug('Popular now!')}
    >
      {SAMPLE_TITLES.map(item => (
        <TitleCard
          key={item.id}
          title={item}
          width={cardWidth}
          onPress={() => console.warn({ ...item })}
        />
      ))}
    </Carousel>
  )
}

export const HomeSliders = {
  TopPick: HomeTopPickSlider,
  PopularNow: HomePopularNowSlider
}
