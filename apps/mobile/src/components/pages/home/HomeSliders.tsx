import type { DiscoverItemResponse } from '@app/api/src/generated/model'
import { SPACINGS } from '@app/tokens'
import { StyleSheet, View, useWindowDimensions } from 'react-native'

import { Carousel } from '@/components/carousel/Carousel'
import { TitleCard } from '@/components/title-card/TitleCard'

interface Props {
  items: DiscoverItemResponse[]
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
          key={item.key}
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
          key={item.key}
          title={item}
          width={width}
          onPress={() => console.warn({ ...item })}
        />
      ))}
    </Carousel>
  )
}

interface HomeSlidersProps {
  items: DiscoverItemResponse[]
}

const getItems = (items: DiscoverItemResponse[]) => ({
  topPicksItems: items.slice(0, items.length / 2 - 1),
  popularNowItems: items.slice(items.length / 2 - 1)
})

export function HomeSliders({ items: allItems }: HomeSlidersProps) {
  const { topPicksItems, popularNowItems } = getItems(allItems.slice(5))

  const { width: windowWidth } = useWindowDimensions()

  const cardCountPerScreen = Math.trunc(windowWidth / 110)
  const cardCountMultiplier = cardCountPerScreen * 1.05
  const totalGap = SPACINGS[3] * (cardCountPerScreen + 1)

  const cardWidth = (windowWidth - totalGap) / cardCountMultiplier

  if (!allItems.length) return null

  return (
    <View style={styles.root}>
      {!!topPicksItems.length && (
        <HomeTopPickSlider
          width={cardWidth}
          items={topPicksItems}
        />
      )}

      {!!popularNowItems.length && (
        <HomePopularNowSlider
          width={cardWidth}
          items={popularNowItems}
        />
      )}
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
