import { useDiscoverFindByKey } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { useLocalSearchParams } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { ScrollView, StyleSheet, Text, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { HeroBackdrop, HeroTitleInfo } from '@/components/hero'
import { TitlesSlider } from '@/components/titles'
import { Toolbar } from '@/components/toolbar'
import { Button, Screen, ViewLayout } from '@/components/ui'

export default function ItemDetailScreen() {
  const { key, type } = useLocalSearchParams<{ key: string; type: string }>()

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
        withBlur
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
          <ViewLayout.Root style={[styles.descriptionContainer, { height }]}>
            <HeroTitleInfo
              keyItem={key}
              name={title.name}
              genres={title.genres}
              meta={meta}
              description={title.description}
              descriptionLines={4}
            />

            <Button
              label='Add to Library'
              icon={Plus}
              size='lg'
              onPress={() => console.log('Add to Library')}
            />

            {!!cast && (
              <Text style={[styles.baseText]}>
                <Text style={[styles.labelText]}>Cast: </Text>
                <Text style={[styles.castList]}>{cast}</Text>
              </Text>
            )}

            {!!title?.similar?.length && (
              <TitlesSlider
                title='You may also like'
                items={title.similar}
              />
            )}
          </ViewLayout.Root>
        </ViewLayout.Root>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    gap: SPACINGS[5],
    marginHorizontal: LAYOUT['space-horizontal']
  },
  descriptionContainer: {
    gap: SPACINGS[2],
    justifyContent: 'flex-end'
  },
  baseText: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm
  },
  labelText: {
    fontWeight: FONT_WEIGHT.bold
  },
  castList: {
    opacity: 0.7
  }
})
