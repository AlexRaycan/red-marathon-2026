import { type TitleListItemResponseType, useDiscoverFindByKey } from '@app/api'
import { TYPE_LABELS } from '@app/constants'
import { useAuth } from '@app/hooks'
import { LAYOUT, SPACINGS } from '@app/tokens'
import { metaDataFormating } from '@app/utils'
import { router, useLocalSearchParams } from 'expo-router'
import { Home } from 'lucide-react-native'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button, Screen, ViewLayout } from '@/components/ui'

import { Carousel } from '@/components/carousel'
import { HeroTitleInfo } from '@/components/hero'
import { AnimatedHero } from '@/components/pages/details/animated-hero/AnimatedHero'
import { CastCard } from '@/components/pages/details/cast-card/CastCard'
import { DetailsActions } from '@/components/pages/details/details-action-buttons/DetailsActions'
import { DetailsPlatforms } from '@/components/pages/details/details-platforms/DetailsPlatforms'
import { ReviewsSection } from '@/components/pages/details/reviews-section/ReviewsSection'
import { ShareButton } from '@/components/pages/details/share/ShareButton'
import { TITLE_CARD_CONFIG, TitlesSlider } from '@/components/titles'
import { Toolbar } from '@/components/toolbar'

export default function ItemDetailScreen() {
  const { key } = useLocalSearchParams<{
    key: string
    type: TitleListItemResponseType
  }>()

  const inset = useSafeAreaInsets()

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

  const accentColor = config ? config.accent : 'transparent'

  const meta = metaDataFormating(title)

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

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: inset.bottom + LAYOUT['space-vertical']
        }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        <ViewLayout.Root
          style={[
            styles.root,
            {
              paddingBottom: inset.bottom + LAYOUT['space-vertical']
            }
          ]}
        >
          <ViewLayout.Root
            style={[
              styles.baseContainer,
              styles.descriptionContainer,
              { height: heroHeight }
            ]}
          >
            <HeroTitleInfo
              keyItem={key}
              name={title.name}
              genres={title.genres}
              meta={meta}
              platforms={
                title.metadata.platforms ? (
                  <DetailsPlatforms metadata={title.metadata} />
                ) : null
              }
              description={title.description}
              descriptionLines={4}
            />
          </ViewLayout.Root>

          <DetailsActions
            title={title}
            accentColor={accentColor}
            isAuthenticated={isAuthenticated}
          />

          {!!title?.similar?.length && (
            <TitlesSlider
              title='You may also like'
              items={title.similar}
            />
          )}

          {/* TODO: add separate view for developers */}
          {/* TODO: use CREATOR_ROLES_LABELS for carousels' labels */}
          {hasCast && (
            <Carousel
              title={
                title.type === TYPE_LABELS.GAME.toUpperCase()
                  ? 'Developers'
                  : 'Cast'
              }
            >
              {title.creators.map(creator => (
                <CastCard
                  key={creator.name}
                  type='creator'
                  name={creator.name}
                  role={creator.role}
                  photoUrl={creator.photoUrl}
                />
              ))}

              {title.cast.slice(0, 10).map(actor => (
                <CastCard
                  key={actor.name}
                  type='actor'
                  name={actor.name}
                  photoUrl={actor.photoUrl}
                />
              ))}
            </Carousel>
          )}

          <ReviewsSection titleKey={key} />
        </ViewLayout.Root>
      </Animated.ScrollView>

      {/* FIXME: temporary Home button - make a Tabbar */}
      <View
        pointerEvents='box-none'
        style={{
          position: 'absolute',
          left: LAYOUT['space-horizontal'],
          bottom: inset.bottom
        }}
      >
        <Button
          icon={Home}
          size='lg'
          variant='secondary'
          onPress={() => router.dismissTo('/')}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    gap: SPACINGS[5]
  },
  baseContainer: {
    marginHorizontal: LAYOUT['space-horizontal']
  },
  descriptionContainer: {
    gap: SPACINGS[4],
    justifyContent: 'flex-end'
  }
})
