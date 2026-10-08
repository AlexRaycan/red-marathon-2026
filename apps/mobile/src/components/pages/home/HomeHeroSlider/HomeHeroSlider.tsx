import type { DiscoverItemResponse } from '@app/api'
import { LAYOUT, SPACINGS } from '@app/tokens'
import { router } from 'expo-router'
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

import { Button, GlassContainer, PaginationDot } from '@/components/ui'

import { HeroBackdrop, HeroTitleInfo } from '@/components/hero'
import { TITLE_CARD_CONFIG } from '@/components/titles'

interface Props {
  items: DiscoverItemResponse[]
}

export function HomeHeroSlider({ items: allItems }: Props) {
  const items = allItems.slice(0, 5)
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

  const height = width * 1.35
  const currentItem = items[index]

  const config = currentItem?.type ? TITLE_CARD_CONFIG[currentItem.type] : null

  const accentColor = config ? config.accent : 'transparent'

  if (!items.length) return null

  const icon = currentItem?.type ? config?.icon : Play
  const buttonAction = config ? config.buttonAction : 'Play'

  return (
    <View style={[styles.root, { height }]}>
      <Animated.FlatList
        data={items}
        renderItem={({ item }) => (
          <HeroBackdrop
            coverUrl={item.coverUrl}
            height={height}
          />
        )}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={StyleSheet.absoluteFill}
        onScroll={handleScroll}
      />

      {!!currentItem && (
        <View
          style={styles.bottom}
          pointerEvents='box-none'
        >
          <HeroTitleInfo
            keyItem={currentItem?.key}
            name={currentItem?.name}
            nameLines={1}
            genres={currentItem?.genres}
            description={
              "Follow Ted Kaczynski's transformation from Harvard prodigy into the infamous Unabomber. Subjected to controversial psychological experiments by Professor Henry Murray, Kaczynski's troubled past resurfaces decades later when his manhunt, led by FBI agent Joanne Miller, brings to light the chilling consequences of ambition and isolation."
            }
          />

          <GlassContainer
            spacing={10}
            pointerEvents='box-none'
            style={styles.actions}
          >
            <Button
              label={buttonAction}
              icon={icon}
              tintColor={accentColor}
              onPress={() =>
                router.push(`/title/${currentItem?.type}/${currentItem?.key}`)
              }
            />
            <Button
              icon={Plus}
              variant='secondary'
              onPress={() => console.log('Pressed "Add to Watchlist"')}
            />
          </GlassContainer>
        </View>
      )}

      <View style={styles.dots}>
        {items.map((item, index) => {
          return (
            <PaginationDot
              key={`heroSliderDot_${item.key}`}
              itemWidth={width}
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
  }
})
