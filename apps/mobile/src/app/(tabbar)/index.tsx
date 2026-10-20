import { useTrendingTitles } from '@app/api'
import { PROJECT_NAME } from '@app/constants'
import { LAYOUT } from '@app/tokens'
import { Bell } from 'lucide-react-native'
import { View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { Button, Screen } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import { HomeHeroSlider, HomeSliders } from '@/components/pages/home'

export default function Index() {
  const { data } = useTrendingTitles({ take: 20 })

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.set(e.contentOffset.y)
  })

  const items = data?.data ?? []

  return (
    <Screen
      isInfitinyMode
      withExtraMarginTop={false}
    >
      <Toolbar
        isAbsolute
        withBlur
        scrollY={scrollY}
        leftSide={PROJECT_NAME}
        rightSide={
          <Button
            variant='transparent'
            icon={Bell}
            size='lg'
          />
        }
      />

      <View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: LAYOUT['space-vertical']
          }}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
        >
          <HomeHeroSlider titles={items} />

          <HomeSliders items={items} />
        </Animated.ScrollView>
      </View>
    </Screen>
  )
}
