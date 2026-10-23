import { useTrendingTitles } from '@app/api'
import { PROJECT_NAME } from '@app/constants'
import { LAYOUT } from '@app/tokens'
import { Bell } from 'lucide-react-native'
import Animated from 'react-native-reanimated'

import { Button, Screen, ViewLayout } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import { HomeHeroSlider, HomeSliders } from '@/components/pages/home'

import { useScrollAnimation } from '@/hooks'

export default function Index() {
  const { data } = useTrendingTitles({ take: 20 })

  const { scrollY, scrollHandler } = useScrollAnimation()

  const items = data?.data ?? []

  return (
    <Screen>
      <Toolbar
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
    </Screen>
  )
}
