import type { LibraryEntryResponse } from '@app/api'
import { COLORS, FONT_SIZE, LAYOUT, SPACINGS } from '@app/tokens'
import { getCardWidth } from '@app/utils'
import {
  type ScrollViewProps,
  type StyleProp,
  StyleSheet,
  Text,
  type ViewStyle,
  useWindowDimensions
} from 'react-native'
import Animated from 'react-native-reanimated'

import { LibraryCard } from '@/components/pages/library'

interface ISpacings {
  rowGap?: number
  colGap?: number
  padding?: number
}

interface TitlesGridProps extends Pick<ScrollViewProps, 'onScroll'> {
  titles: LibraryEntryResponse[]
  numColumns?: 3
  spacings?: ISpacings
  style?: StyleProp<ViewStyle>
  isPending?: boolean | null
  onEndReached?: () => void
}

export function TitlesGrid({
  titles,
  numColumns = 3,
  spacings = {
    colGap: SPACINGS[4],
    rowGap: SPACINGS[3],
    padding: LAYOUT['space-horizontal']
  },
  style,
  isPending,
  ...props
}: TitlesGridProps) {
  const { width } = useWindowDimensions()
  const cardWidth = getCardWidth(width, numColumns, {
    gap: spacings.rowGap,
    paddingLeft: spacings.padding,
    paddingRight: spacings.padding
  })

  return (
    <Animated.FlatList
      data={titles}
      keyExtractor={title => title.id}
      renderItem={({ item: title }) => (
        <LibraryCard
          title={title}
          width={cardWidth}
        />
      )}
      numColumns={numColumns}
      columnWrapperStyle={{ gap: spacings.rowGap }}
      contentContainerStyle={[
        {
          gap: spacings.colGap,
          paddingHorizontal: spacings.padding,
          paddingBottom: LAYOUT['space-vertical']
        },
        style
      ]}
      ListEmptyComponent={
        isPending ? null : (
          <Text style={styles.emptyList}>Nothing here yet</Text>
        )
      }
      onEndReachedThreshold={0.5}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  emptyList: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center'
  }
})
