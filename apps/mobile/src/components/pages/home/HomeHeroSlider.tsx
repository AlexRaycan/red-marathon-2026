import type { TitleListItemResponse } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Play, Plus } from 'lucide-react-native'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/ui/Button'

const { width } = Dimensions.get('window')
const HEIGHT = width * 1.25

interface Props {
  items: TitleListItemResponse[]
}

const Item = ({ item }: { item: TitleListItemResponse }) => (
  <View style={styles.slide}>
    <Image
      source={item.coverUrl}
      contentFit='cover'
      transition={300}
      style={StyleSheet.absoluteFill}
    />
    <LinearGradient
      colors={['transparent', 'rgba(2, 0, 3, 0.8)', COLORS.bg.base]}
      locations={[0.35, 0.75, 1]}
      style={StyleSheet.absoluteFill}
    />

    <View style={styles.content}>
      <Text
        numberOfLines={2}
        style={styles.name}
      >
        {item.name}
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
  </View>
)

export function HomeHeroSlider({ items }: Props) {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ height: HEIGHT }}
    />
  )
}

const styles = StyleSheet.create({
  slide: {
    height: HEIGHT,
    width,
    justifyContent: 'flex-end'
  },
  content: {
    padding: LAYOUT['space-horizontal'],
    gap: SPACINGS[4]
  },
  name: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['3xl'],
    fontWeight: FONT_WEIGHT.bold
  },
  actions: {
    gap: SPACINGS[3],
    flexDirection: 'row'
  }
})
