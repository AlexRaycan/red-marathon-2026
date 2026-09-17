import type { TitleListItemResponse } from '@app/api'
import { SPACINGS } from '@app/tokens'
import { StyleSheet, View, useWindowDimensions } from 'react-native'

import { Carousel } from '@/components/carousel/Carousel'
import { TitleCard } from '@/components/title-card/TitleCard'

interface Props {
  items: TitleListItemResponse[]
  width: number
}

function HomeTopPickSlider({ items, width }: Props) {
  return (
    <Carousel
      title={'Top picks for you'}
      onPress={() => console.debug('Top picks for you!')}
    >
      {items.map(item => (
        <TitleCard
          key={item.id}
          title={item}
          width={width}
          onPress={() => console.warn({ ...item })}
        />
      ))}
    </Carousel>
  )
}

function HomePopularNowSlider({ items, width }: Props) {
  return (
    <Carousel
      title={'Popular now'}
      onPress={() => console.debug('Popular now!')}
    >
      {items.map(item => (
        <TitleCard
          key={item.id}
          title={item}
          width={width}
          onPress={() => console.warn({ ...item })}
        />
      ))}
    </Carousel>
  )
}

interface HomeSlidersProps {
  items: TitleListItemResponse[]
}

export function HomeSliders({ items }: HomeSlidersProps) {
  const { width: windowWidth } = useWindowDimensions()

  const cardCountPerScreen = Math.trunc(windowWidth / 110)
  const cardCountMultiplier = cardCountPerScreen * 1.05
  const totalGap = SPACINGS[3] * (cardCountPerScreen + 1)

  const cardWidth = (windowWidth - totalGap) / cardCountMultiplier

  return (
    <View style={styles.root}>
      <HomeTopPickSlider
        width={cardWidth}
        items={items}
      />
      <HomePopularNowSlider
        width={cardWidth}
        items={items}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: SPACINGS[6],
    marginTop: SPACINGS[6]
  }
})
