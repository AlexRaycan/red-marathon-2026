import { useDiscoverGetTrending } from '@app/api'
import { LAYOUT } from '@app/tokens'
import { HomeHeader } from '@components/pages/home/HomeHeader'
import { HomeHeroSlider } from '@components/pages/home/HomeHeroSlider/HomeHeroSlider'
import { HomeSliders } from '@components/pages/home/HomeSliders'
import { View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Screen } from '@/components/ui/Screen'

export default function Index() {
  const inset = useSafeAreaInsets()

  const { data, isPending } = useDiscoverGetTrending({ take: 10 })

  const { data: items, status } = data ?? {}

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.set(e.contentOffset.y)
  })

  if (status !== 200 && isPending) return null

  if (!items) return null

  return (
    <Screen isInfitinyMode>
      <HomeHeader scrollY={scrollY} />

      <View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: inset.bottom + LAYOUT['space-vertical']
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
