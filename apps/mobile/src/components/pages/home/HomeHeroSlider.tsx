import type { TitleListItemResponse } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Play, Plus } from 'lucide-react-native'
import {
  FlatList,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
  useWindowDimensions
} from 'react-native'

import { Button } from '@/components/ui/Button'

interface Props {
  items: TitleListItemResponse[]
}

const Item = ({
  item,
  style
}: {
  item: TitleListItemResponse
  style?: StyleProp<ViewStyle>
}) => (
  <View style={[style, styles.slide]}>
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
  const { width } = useWindowDimensions()
  const height = width * 1.25

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <Item
          item={item}
          style={{ width, height }}
        />
      )}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ height }}
    />
  )
}

const styles = StyleSheet.create({
  slide: {
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
