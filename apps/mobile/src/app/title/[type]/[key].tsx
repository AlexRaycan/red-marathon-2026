import { TitleListItemResponseType, useDiscoverFindByKey } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { getCardWidth } from '@app/utils'
import { useLocalSearchParams } from 'expo-router'
import { Plus } from 'lucide-react-native'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Carousel } from '@/components/carousel'
import { HeroBackdrop, HeroTitleInfo } from '@/components/hero'
import { TITLE_CARD_CONFIG, TitlesSlider } from '@/components/titles'
import { Toolbar } from '@/components/toolbar'
import { Button, Screen, ViewLayout } from '@/components/ui'
import { Card } from '@/components/ui/Card'

export default function ItemDetailScreen() {
  const { key, type } = useLocalSearchParams<{
    key: string
    type: TitleListItemResponseType
  }>()

  const config = TITLE_CARD_CONFIG[type]

  const accentColor = config ? config.accent : 'transparent'

  const inset = useSafeAreaInsets()

  const { width } = useWindowDimensions()
  const height = width * 1.35

  const { data, isPending } = useDiscoverFindByKey(key)

  if (isPending || !data || data?.status !== 200) return <Screen />

  const title = data.data

  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null

  const meta = [year, ...title.genres.slice(0, 3)].filter(Boolean).join(' • ')

  const cast = title.actors
    .slice(0, 3)
    .map(actor => actor.name)
    .join(', ')

  return (
    <Screen isInfitinyMode>
      <Toolbar
        isBackButton
        isAbsolute
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: inset.bottom + LAYOUT['space-vertical']
        }}
        scrollEventThrottle={16}
      >
        <HeroBackdrop
          coverUrl={title.coverUrl}
          height={height}
          style={StyleSheet.absoluteFill}
        />

        <ViewLayout.Root style={[styles.root]}>
          <ViewLayout.Root
            style={[
              styles.baseContainer,
              styles.descriptionContainer,
              { height }
            ]}
          >
            <HeroTitleInfo
              keyItem={key}
              name={title.name}
              genres={title.genres}
              meta={meta}
              description={title.description}
              descriptionLines={4}
            />
          </ViewLayout.Root>

          <View style={[styles.baseContainer]}>
            <Button
              label='Add to Library'
              icon={Plus}
              size='lg'
              tintColor={accentColor}
              onPress={() => console.log('Add to Library')}
            />
          </View>

          {!!title?.similar?.length && (
            <TitlesSlider
              title='You may also like'
              items={title.similar}
            />
          )}

          {!!cast && (
            <Carousel title='Cast'>
              {title.actors.slice(0, 10).map(actor => (
                <View
                  key={actor.name}
                  style={[styles.castCardContainer]}
                >
                  <Card
                    sourceImage={actor.photoUrl}
                    cardWidth={getCardWidth(width)}
                    onPress={() => console.log(actor)}
                  />
                  <Text style={[styles.castLabel]}>{actor.name}</Text>
                </View>
              ))}
            </Carousel>
          )}
        </ViewLayout.Root>
      </ScrollView>
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
  },
  labelText: {
    fontWeight: FONT_WEIGHT.bold
  },
  castCardContainer: {
    gap: SPACINGS[2]
  },
  castLabel: {
    color: COLORS.text['little-muted'],
    textAlign: 'center',
    fontSize: FONT_SIZE.sm
  }
})
