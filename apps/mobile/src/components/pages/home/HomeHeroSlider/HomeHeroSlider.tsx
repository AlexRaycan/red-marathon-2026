import type { TitleListItemResponse } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { Play, Plus } from 'lucide-react-native'
import { useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { Button } from '@/components/ui/Button'

import { HomeHeroSliderItem } from './HomeHeroSliderItem'
import { PaginationDot } from './PaginationDot'

interface Props {
  items: TitleListItemResponse[]
}

export function HomeHeroSlider({ items }: Props) {
  const { width } = useWindowDimensions()

  const [index, setIndex] = useState(0)

  const scrollX = useSharedValue(0)

  const handleScroll = useAnimatedScrollHandler(e => {
    scrollX.set(e.contentOffset.x)
  })

  if (!items.length) return null

  const height = width * 1.35
  const currentItem = items[index]

  return (
    <View style={[styles.root, { height }]}>
      <Animated.FlatList
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
        onScroll={handleScroll}
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
        {items.map((item, index) => {
          return (
            <PaginationDot
              key={`heroSliderDot_${item.id}_${index}`}
              index={index}
              width={width}
              scrollX={scrollX}
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
