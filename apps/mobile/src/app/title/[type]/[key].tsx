import { type TitleListItemResponseType, useDiscoverFindByKey } from '@app/api'
import { useAuth } from '@app/hooks'
import { SPACINGS } from '@app/tokens'
import { router, useLocalSearchParams } from 'expo-router'
import { Home } from 'lucide-react-native'
import { StyleSheet, useWindowDimensions } from 'react-native'
import {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { FloatingButton, Screen } from '@/components/ui'

import { TITLE_CARD_CONFIG, Toolbar } from '@/components/elements'
import {
  AnimatedHero,
  DetailsInfo,
  ShareButton
} from '@/components/pages/details'

import { useBottomSpace } from '@/hooks'

export default function ItemDetailScreen() {
  const { key } = useLocalSearchParams<{
    key: string
    type: TitleListItemResponseType
  }>()

  const { bottomSpace } = useBottomSpace()

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

  const config = TITLE_CARD_CONFIG[title.type]
  const accentColor = config.accent

  const hasCast = !!title.cast?.length || !!title.creators?.length

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

      {/* <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottomSpace
        }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        <ViewLayout.Root
          style={[
            styles.root,
            {
              paddingBottom: bottomSpace
            }
          ]}
        >
          <DetailsTitle
            title={title}
            heroHeight={heroHeight}
          />

          <DetailsActions
            title={title}
            accentColor={accentColor}
            isAuthenticated={isAuthenticated}
          />

          {!!title?.similar?.length && (
            <TitlesCarousel
              title='You may also like'
              items={title.similar}
            />
          )}

          {hasCast && <CastCarousel title={title} />}

          <ReviewsSection titleKey={key} />
        </ViewLayout.Root>
      </Animated.ScrollView> */}

      {/* FIXME: temporary Home button - make a Tabbar */}
      <FloatingButton
        icon={Home}
        onPress={() => router.dismissTo('/')}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    gap: SPACINGS[5]
  }
})
