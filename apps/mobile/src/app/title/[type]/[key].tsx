import { type TitleListItemResponseType, useDiscoverFindByKey } from '@app/api'
import { router, useLocalSearchParams } from 'expo-router'
import { Home } from 'lucide-react-native'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

import { FloatingButton, Screen } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import { HeroBackdrop } from '@/components/hero'
import { DetailsInfo, ShareButton } from '@/components/pages/details'

import { useBottomSpace, useHeroParallax } from '@/hooks'

export default function ItemDetailScreen() {
  const { key } = useLocalSearchParams<{
    key: string
    type: TitleListItemResponseType
  }>()
  const { data, isPending } = useDiscoverFindByKey(key)

  const { heroHeight, heroStyle, scrollHandler } = useHeroParallax()
  const { bottomSpace } = useBottomSpace()

  if (isPending || !data || data?.status !== 200) return <Screen />

  const title = data.data

  return (
    <Screen isInfitinyMode>
      <Toolbar
        isBackButton
        isAbsolute
        rightSide={<ShareButton title={title} />}
      />

      <Animated.View
        style={[styles.hero, heroStyle]}
        pointerEvents={'none'}
      >
        <HeroBackdrop
          coverUrl={title.coverUrl}
          height={heroHeight}
        />
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottomSpace
        }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        <DetailsInfo
          title={title}
          heroHeight={heroHeight}
        />
      </Animated.ScrollView>

      {/* FIXME: temporary Home button - make a Tabbar */}
      <FloatingButton
        icon={Home}
        onPress={() => router.dismissTo('/')}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
})
