import type { TitleListItemResponse } from '@app/api'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Carousel } from '@/components/carousel/Carousel'
import { HomeHeader } from '@/components/pages/home/HomeHeader'
import { HomeHeroSlider } from '@/components/pages/home/HomeHeroSlider'
import { TitleCard } from '@/components/title-card/TitleCard'
import { Screen } from '@/components/ui/Screen'

export const SAMPLE_TITLES: TitleListItemResponse[] = [
  {
    id: 'clx1',
    type: 'MOVIE',
    name: 'Dune: Part Two',
    slug: 'dune-part-two',
    coverUrl: 'https://poster4.me/wp-content/uploads/2021/10/dyuna_10.jpg',
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
  return (
    <Screen>
      <HomeHeader />

      <View
        style={
          {
            // marginTop: 60
          }
        }
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeHeroSlider items={SAMPLE_TITLES} />

          <Carousel
            title={'Top picks for you'}
            onPress={() => console.debug('Top picks for you!')}
          >
            {SAMPLE_TITLES.map(item => (
              <TitleCard
                key={item.id}
                title={item}
                onPress={() => console.warn({ ...item })}
              />
            ))}
          </Carousel>
          <Carousel
            title={'Popular now'}
            onPress={() => console.debug('Popular now!')}
          >
            {SAMPLE_TITLES.map(item => (
              <TitleCard
                key={item.id}
                title={item}
                onPress={() => console.warn({ ...item })}
              />
            ))}
          </Carousel>
        </ScrollView>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})
