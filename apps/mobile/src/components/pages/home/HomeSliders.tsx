import type { DiscoverItemResponse } from '@app/api/src/generated/model'
import { SPACINGS } from '@app/tokens'
import { StyleSheet, View } from 'react-native'

import { TitlesSlider } from '@/components/titles'

interface HomeSlidersProps {
  items: DiscoverItemResponse[]
}

const getItems = (items: DiscoverItemResponse[]) => ({
  topPicksItems: items.slice(0, items.length / 2 - 1),
  popularNowItems: items.slice(items.length / 2 - 1)
})

export function HomeSliders({ items: allItems }: HomeSlidersProps) {
  const { topPicksItems, popularNowItems } = getItems(allItems.slice(5))

  if (!allItems.length) return null

  return (
    <View style={styles.root}>
      {!!topPicksItems.length && (
        <TitlesSlider
          title={'Top picks for you'}
          items={topPicksItems}
          onPress={() => console.debug('Top picks for you!')}
        />
      )}

      {!!popularNowItems.length && (
        <TitlesSlider
          title={'Popular now'}
          items={popularNowItems}
          onPress={() => console.debug('Popular now!')}
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
