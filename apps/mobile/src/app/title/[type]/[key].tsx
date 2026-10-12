import { type TitleListItemResponseType, useDiscoverFindByKey } from '@app/api'
import { useAuth } from '@app/hooks'
import { router, useLocalSearchParams } from 'expo-router'
import { Home } from 'lucide-react-native'
import { useWindowDimensions } from 'react-native'
import {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { FloatingButton, Screen } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import {
  AnimatedHero,
  DetailsInfo,
  ShareButton
} from '@/components/pages/details'

export default function ItemDetailScreen() {
  const { key } = useLocalSearchParams<{
    key: string
    type: TitleListItemResponseType
  }>()

  const { width } = useWindowDimensions()
  const heroHeight = width * 1.35

  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(e =>
    scrollY.set(e.contentOffset.y)
  )

  const { data, isPending } = useDiscoverFindByKey(key)

  const { isAuthenticated } = useAuth()

  if (isPending || !data || data?.status !== 200) return <Screen />

  const title = data.data

  return (
    <Screen isInfitinyMode>
      <Toolbar
        isBackButton
        isAbsolute
        rightSide={
          <ShareButton
            isAuthenticated={isAuthenticated}
            title={title}
          />
        }
      />
      <AnimatedHero
        heroHeight={heroHeight}
        coverUrl={title.coverUrl}
        scrollY={scrollY}
      />

      <DetailsInfo
        title={title}
        heroHeight={heroHeight}
        isAuthenticated={isAuthenticated}
        onScroll={scrollHandler}
      />

      {/* FIXME: temporary Home button - make a Tabbar */}
      <FloatingButton
        icon={Home}
        onPress={() => router.dismissTo('/')}
      />
    </Screen>
  )
}
