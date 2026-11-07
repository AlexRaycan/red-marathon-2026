import type { DiscoverItemResponse } from '@app/api/src/generated/model'
import { useAiTopPicks } from '@app/hooks'
import { SPACINGS } from '@app/tokens'
import { StyleSheet, View } from 'react-native'

import { TitlesCarousel } from '@/components/elements'

import { useProtectedPush } from '@/hooks'

interface HomeSlidersProps {
  items: DiscoverItemResponse[]
}

const getItems = (items: DiscoverItemResponse[]) => ({
  topPicksItems: items.slice(0, items.length / 2 - 1),
  popularNowItems: items.slice(items.length / 2 - 1)
})

export function HomeSliders({ items: allItems }: HomeSlidersProps) {
  const { topPicksItems, popularNowItems } = getItems(allItems.slice(5))

  const protectedPush = useProtectedPush()

  const { picks: topPicks } = useAiTopPicks(topPicksItems)

  if (!allItems.length) return null

  return (
    <View style={styles.root}>
      {!!topPicks.length && (
        <TitlesCarousel
          title={'Top picks for you'}
          titles={topPicks}
          onPress={() => protectedPush('/(tabbar)/ai-picker')}
        />
      )}

      {!!popularNowItems.length && (
        <TitlesCarousel
          title={'Popular now'}
          titles={popularNowItems}
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
