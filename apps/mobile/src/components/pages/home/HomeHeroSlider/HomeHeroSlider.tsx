import type { TitleListItemResponse } from '@app/api'
import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import { Play, Plus } from 'lucide-react-native'
import { useState } from 'react'
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
  useWindowDimensions
} from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { TITLE_CARD_CONFIG } from '@/components/title-card/TitleCard.config'
import { Button } from '@/components/ui/Button'
import { GlassContainer } from '@/components/ui/GlassContainer'

import { HomeHeroSliderItemCover } from './HomeHeroSliderItemCover'
import { HomeHeroItemInfo } from './HomeHeroSliderItemInfo'
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

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const { contentOffset } = event.nativeEvent
    const index = Math.round(contentOffset.x / width)
    setIndex(index)
  }

  if (!items.length) return null

  const height = width * 1.35
  const currentItem = items[index]
  const accentColor = currentItem?.type
    ? (TITLE_CARD_CONFIG[currentItem.type]?.accent ?? 'transparent')
    : 'transparent'

  return (
    <View style={[styles.root, { height }]}>
      <Animated.FlatList
        data={items}
        renderItem={({ item }) => (
          <HomeHeroSliderItemCover
            item={item}
            style={{ width, height }}
          />
        )}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={StyleSheet.absoluteFill}
        onScroll={handleScroll}
      />

      <View
        style={styles.bottom}
        pointerEvents='box-none'
      >
        <HomeHeroItemInfo item={currentItem} />

        <GlassContainer
          spacing={10}
          pointerEvents='box-none'
          style={styles.actions}
        >
          <Button
            label='Watch Movie'
            icon={Play}
            tintColor={accentColor}
            onPress={() => console.log('Pressed "Watch Movie"')}
          />
          <Button
            icon={Plus}
            variant='secondary'
            onPress={() => console.log('Pressed "Add to Watchlist"')}
          />
        </GlassContainer>
      </View>
      <View style={styles.dots}>
        {items.map((item, index) => {
          return (
            <PaginationDot
              key={`heroSliderDot_${item.id}_${index}`}
              width={width}
              index={index}
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
