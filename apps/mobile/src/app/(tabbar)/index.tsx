import { useDiscoverGetTrending } from '@app/api'
import { LAYOUT } from '@app/tokens'
import { View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { Screen } from '@/components/ui'

import {
  HomeHeader,
  HomeHeroSlider,
  HomeSliders
} from '@/components/pages/home'

export default function Index() {
  const { data, isPending } = useDiscoverGetTrending({ take: 20 })

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.set(e.contentOffset.y)
  })

  const items = data?.data ?? []

  return (
    <Screen isInfitinyMode>
      <HomeHeader scrollY={scrollY} />

      <View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: LAYOUT['space-vertical']
          }}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
        >
          <HomeHeroSlider items={items} />

          <HomeSliders items={items} />
        </Animated.ScrollView>
      </View>
    </Screen>
  )
}
