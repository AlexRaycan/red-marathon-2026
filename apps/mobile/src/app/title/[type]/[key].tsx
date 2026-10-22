import { useTitle } from '@app/api'
import { useRatingStore } from '@app/store'
import { router, useLocalSearchParams } from 'expo-router'
import { Home } from 'lucide-react-native'
import { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

import { FloatingButton, Screen } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import { HeroBackdrop } from '@/components/hero'
import { DetailsInfo, ShareButton } from '@/components/pages/details'

import { useHeroParallax, useSpaces } from '@/hooks'

export default function ItemDetailScreen() {
  const { key } = useLocalSearchParams<{
    key: string
  }>()
  const clearReviewInStore = useRatingStore(state => state.removeReviews)

  const { data, isPending } = useTitle(key)

  const { scrollY, heroHeight, heroStyle, scrollHandler } = useHeroParallax()
  const { tabbarSpace: bottomSpace } = useSpaces()

  const handleGoHomeButton = useCallback(() => {
    clearReviewInStore()
    router.dismissTo('/')
  }, [clearReviewInStore])

  if (isPending || !data || data?.status !== 200) return <Screen />

  const title = data.data

  return (
    <Screen>
      <Toolbar
        scrollY={scrollY}
        isBackButton
        withGradient
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
        onPress={handleGoHomeButton}
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
