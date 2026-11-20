import { useTrendingTitles } from '@app/api'
import { PROJECT_NAME } from '@app/constants'
import { LAYOUT } from '@app/tokens'
import Animated from 'react-native-reanimated'

import { Screen, ViewLayout } from '@/components/ui'

import {
  NotificationButton,
  SplashScreen,
  Toolbar
} from '@/components/elements'
import { HomeHeroSlider, HomeSliders } from '@/components/screens/home'

import { useScrollAnimation } from '@/hooks'

export default function Index() {
  const { data, isPending } = useTrendingTitles({ take: 20 })

  const { scrollY, scrollHandler } = useScrollAnimation()

  const items = data?.data ?? []

  return (
    <Screen>
      <Toolbar
        withBlur
        scrollY={scrollY}
        leftSide={PROJECT_NAME}
        rightSide={<NotificationButton />}
      />

      <ViewLayout.Root>
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
      </ViewLayout.Root>

      {isPending && <SplashScreen />}
    </Screen>
  )
}
