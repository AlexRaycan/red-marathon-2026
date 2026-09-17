import { SPACINGS } from '@app/tokens'
import { StyleSheet, View } from 'react-native'

import { Carousel } from '@/components/carousel/Carousel'
import { TitleCard } from '@/components/title-card/TitleCard'

import { SAMPLE_TITLES } from '@/app/(tabbar)'

interface Props {
  width: number
}

function HomeTopPickSlider({ width }: Props) {
  return (
    <Carousel
      title={'Top picks for you'}
      onPress={() => console.debug('Top picks for you!')}
    >
      {SAMPLE_TITLES.map(item => (
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

function HomePopularNowSlider({ width }: Props) {
  return (
    <Carousel
      title={'Popular now'}
      onPress={() => console.debug('Popular now!')}
    >
      {SAMPLE_TITLES.map(item => (
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

export function HomeSliders({ width: windowWidth }: Props) {
  const cardCountPerScreen = Math.trunc(windowWidth / 110)
  const cardCountMultiplier = cardCountPerScreen * 1.05
  const totalGap = SPACINGS[3] * (cardCountPerScreen + 1)

  const cardWidth = (windowWidth - totalGap) / cardCountMultiplier

  return (
    <View style={styles.root}>
      <HomeTopPickSlider width={cardWidth} />
      <HomePopularNowSlider width={cardWidth} />
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
