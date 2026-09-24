import type { TitleListItemResponse } from '@app/api'
import { LAYOUT } from '@app/tokens'
import { HomeHeader } from '@components/pages/home/HomeHeader'
import { HomeHeroSlider } from '@components/pages/home/HomeHeroSlider/HomeHeroSlider'
import { HomeSliders } from '@components/pages/home/HomeSliders'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { Screen } from '@/components/ui/Screen'

export const SAMPLE_TITLES: TitleListItemResponse[] = [
  {
    id: 'clx1',
    type: 'MOVIE',
    name: 'Dune: Part Two',
    slug: 'dune-part-two',
    coverUrl:
      'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    releaseDate: '2024-03-01T00:00:00.000Z',
    rating: 8.4,
    ratingCount: 1200
  },
  {
    id: 'clx2',
    type: 'TV_SHOW',
    name: 'Severance',
    slug: 'severance',
    coverUrl:
      'https://www.cinematerial.com/p/500x/1k35swfb/severance-movie-poster.jpg',
    releaseDate: '2022-02-18T00:00:00.000Z',
    rating: 8.7,
    ratingCount: 2100
  },
  {
    id: 'clx3',
    type: 'ANIME',
    name: "Frieren: Beyond Journey's End",
    slug: 'frieren',
    coverUrl:
      'https://m.media-amazon.com/images/I/71SZgjz10wL._AC_UF1000,1000_QL80_.jpg',
    releaseDate: '2023-09-29T00:00:00.000Z',
    rating: 9.3,
    ratingCount: 1800
  },
  {
    id: 'clx4',
    type: 'BOOK',
    name: 'Project Hail Mary',
    slug: 'project-hail-mary',
    coverUrl:
      'https://m.media-amazon.com/images/I/81WXoyRUc+L._AC_UF1000,1000_QL80_.jpg',
    releaseDate: '2021-05-04T00:00:00.000Z',
    rating: 8.9,
    ratingCount: 760
  },
  {
    id: 'clx5',
    type: 'GAME',
    name: "Baldur's Gate 3",
    slug: 'baldurs-gate-3',
    coverUrl: 'https://m.media-amazon.com/images/I/71T9Nc8x-3L.jpg',
    releaseDate: '2023-08-03T00:00:00.000Z',
    rating: 9.6,
    ratingCount: 8900
  }
]

export default function Index() {
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.set(e.contentOffset.y)
  })

  return (
    <Screen isInfitinyMode>
      <HomeHeader scrollY={scrollY} />

      <View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
        >
          <HomeHeroSlider items={SAMPLE_TITLES} />

          <HomeSliders items={SAMPLE_TITLES} />
          {/* <Button
            label='Sign up'
            onPress={() => router.push('/register')}
          /> */}
        </Animated.ScrollView>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: LAYOUT['space-vertical']
  }
})
