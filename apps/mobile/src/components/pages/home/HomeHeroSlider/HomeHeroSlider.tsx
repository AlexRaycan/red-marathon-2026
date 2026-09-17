import type { TitleListItemResponse } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { Play, Plus } from 'lucide-react-native'
import { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native'

import { Button } from '@/components/ui/Button'

import { HomeHeroSliderItem } from './HomeHeroSliderItem'

interface Props {
  items: TitleListItemResponse[]
}

export function HomeHeroSlider({ items }: Props) {
  const { width } = useWindowDimensions()

  const [index, setIndex] = useState(0)

  if (!items.length) return null

  const height = width * 1.35
  const currentItem = items[index]

  return (
    <View style={[styles.root, { height }]}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <HomeHeroSliderItem
            item={item}
            style={{ width, height }}
          />
        )}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const { contentOffset } = event.nativeEvent
          const newIndex = Math.round(contentOffset.x / width)
          setIndex(newIndex)
        }}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={styles.bottom}
        pointerEvents='box-none'
      >
        <Text
          numberOfLines={2}
          style={styles.name}
        >
          {currentItem?.name}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.genres}
        >
          {currentItem?.genres}
          {['Sci-Fi', 'Adventure', 'Drama'].join(' • ')}
        </Text>

        <Text
          numberOfLines={2}
          style={styles.description}
        >
          {currentItem?.description}
          Paul Atreides joins the Fremen and rises against the forces
          threatening Arrakis.
        </Text>

        <View style={styles.actions}>
          <Button
            icon={Play}
            onPress={() => console.log('Pressed "Watch Movie"')}
          >
            Watch Movie
          </Button>
          <Button
            icon={Plus}
            variant='secondary'
            onPress={() => console.log('Pressed "Add to Watchlist"')}
          />
        </View>
      </View>
      <View style={styles.dots}>
        {items.map((_, i) => {
          const distance = Math.abs(i - index)
          const size = Math.max(4, 9 - distance)

          return (
            <View
              key={`heroSliderDot${i}`}
              style={[
                styles.dot,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2
                },
                i === index && styles.dotActive
              ]}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
    position: 'relative'
  },
  name: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['3xl'],
    fontWeight: FONT_WEIGHT.bold
  },
  genres: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular
  },
  description: {
    color: COLORS.text.primary,
    opacity: 0.5,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular
  },
  bottom: {
    paddingHorizontal: LAYOUT['space-horizontal'],
    gap: SPACINGS[4]
  },
  actions: {
    gap: SPACINGS[3],
    flexDirection: 'row'
  },
  dots: {
    position: 'absolute',
    right: LAYOUT['space-horizontal'],
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[2]
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary
  },
  dotActive: {
    backgroundColor: COLORS.primary
  }
})
