import { type TitleListItemResponseType, useDiscoverFindByKey } from '@app/api'
import { type Platform, TYPE_LABELS } from '@app/constants'
import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import {
  convertMinsToHrs,
  firstLetterUpperCase,
  normalizePlatform
} from '@app/utils'
import { router, useLocalSearchParams } from 'expo-router'
import { Bookmark, Home, Plus, Share, Star } from 'lucide-react-native'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  Button,
  GlassContainer,
  PlatformIcon,
  Screen,
  ViewLayout
} from '@/components/ui'

import { Carousel } from '@/components/carousel'
import { CastCard } from '@/components/cast-card/CastCard'
import { HeroBackdrop, HeroTitleInfo } from '@/components/hero'
import { TITLE_CARD_CONFIG, TitlesSlider } from '@/components/titles'
import { Toolbar } from '@/components/toolbar'

const OVERLAP_HEIGHT = SPACINGS[10]

export default function ItemDetailScreen() {
  const { key } = useLocalSearchParams<{
    key: string
    type: TitleListItemResponseType
  }>()

  const inset = useSafeAreaInsets()

  const { width } = useWindowDimensions()
  const heroHeight = width * 1.35

  // Parallax effect BLOCK BEGIN
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(e =>
    scrollY.set(e.contentOffset.y)
  )

  const heroStyle = useAnimatedStyle(() => {
    const y = scrollY.get()

    return {
      opacity: interpolate(y, [0, heroHeight], [1, 0.1], 'clamp'),
      transform: [
        {
          translateY: interpolate(
            y,
            [-heroHeight, 0, heroHeight],
            [heroHeight / 2, 0, -heroHeight * 0.3],
            'clamp'
          )
        },
        {
          scale: interpolate(y, [-heroHeight, 0], [2, 1], 'clamp')
        }
      ]
    }
  })
  // Parallax effect BLOCK END

  const { data, isPending } = useDiscoverFindByKey(key)

  if (isPending || !data || data?.status !== 200) return <Screen />

  const title = data.data

  const config = TITLE_CARD_CONFIG[title.type]

  const accentColor = config ? config.accent : 'transparent'

  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null

  // FIXME: Refactor and add types
  let normalizedPlatforms: Platform[]

  const metadata = Object.entries(title.metadata).map(([key, val]) => {
    switch (key) {
      case 'averagePlaytimeHours':
        return `${val}h`
      case 'runtimeMinutes': {
        const { hours, minutes } = convertMinsToHrs(Number(val))

        return `${hours}h ${minutes}m`
      }
      case 'platforms':
        normalizedPlatforms = [...new Set(val.map(normalizePlatform))]
        break
      default: {
        return `${firstLetterUpperCase(key)}: ${val}`
      }
    }
  })

  const platforms = normalizedPlatforms?.map(p => {
    return (
      <PlatformIcon
        key={p}
        platform={p}
        color={COLORS.text.primary}
        size={FONT_SIZE.sm}
      />
    )
  })

  const meta = [year, ...metadata, title.ageRating].filter(Boolean).join(' • ')

  const hasCast = !!title.cast?.length || !!title.creators?.length

  return (
    <Screen isInfitinyMode>
      <Toolbar
        isBackButton
        isAbsolute
        rightSide={
          <Button
            icon={Share}
            variant='transparent'
          />
        }
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
              platforms={platforms}
              description={title.description}
              descriptionLines={4}
            />
          </ViewLayout.Root>

          <GlassContainer>
            <View style={[styles.baseContainer, styles.actionButtonContainer]}>
              <Button
                label='Add to Library'
                icon={Plus}
                size='lg'
                tintColor={accentColor}
                onPress={() => console.log('Add to Library')}
              />
              <View style={[styles.actionButtonGroup]}>
                <Button
                  label='Add to Watchlist'
                  icon={Bookmark}
                  fullWidth
                  onPress={() => console.log('Pressed Add to Watchlist')}
                />
                <Button
                  label='Rate'
                  icon={Star}
                  fullWidth
                  onPress={() => console.log('Pressed Rate')}
                />
              </View>
            </View>
          </GlassContainer>

          {/* TODO: add seperate view for developers */}
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

          {!!title?.similar?.length && (
            <TitlesSlider
              title='You may also like'
              items={title.similar}
            />
          )}
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
          variant='transparent'
          onPress={() => router.push('/')}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  root: {
    position: 'relative',
    gap: SPACINGS[5]
  },
  bodyFade: {
    position: 'absolute',
    top: -OVERLAP_HEIGHT,
    left: 0,
    right: 0,
    height: OVERLAP_HEIGHT
  },
  baseContainer: {
    marginHorizontal: LAYOUT['space-horizontal']
  },
  descriptionContainer: {
    gap: SPACINGS[4],
    justifyContent: 'flex-end'
  },
  labelText: {
    fontWeight: FONT_WEIGHT.bold
  },
  actionButtonContainer: {
    gap: SPACINGS[4]
  },
  actionButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[3]
  }
})
