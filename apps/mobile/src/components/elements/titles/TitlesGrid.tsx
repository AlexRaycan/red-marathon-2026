import { COLORS, FONT_SIZE, LAYOUT, SPACINGS } from '@app/tokens'
import type { TTitleGrid } from '@app/types'
import { getCardWidth, toFixed } from '@app/utils'
import { router } from 'expo-router'
import type { ReactNode } from 'react'
import {
  type ScrollViewProps,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
  useWindowDimensions
} from 'react-native'
import Animated from 'react-native-reanimated'

import { TitleCard } from './title-card'

interface ISpacings {
  rowGap?: number
  colGap?: number
  padding?: number
}

interface TitlesGridProps<T> extends Pick<ScrollViewProps, 'onScroll'> {
  titles: T[]
  getTitle: (item: T) => TTitleGrid
  keyExtractor: (item: T) => string
  header?: ReactNode
  numColumns?: 3
  spacings?: ISpacings
  emptyText?: string
  isStickyHeader?: boolean
  isPending?: boolean | null
  style?: StyleProp<ViewStyle>
  onEndReached?: () => void
}

export function TitlesGrid<T>({
  titles,
  getTitle,
  keyExtractor,
  header,
  numColumns = 3,
  spacings = {
    colGap: SPACINGS[4],
    rowGap: SPACINGS[3],
    padding: LAYOUT['space-horizontal']
  },
  emptyText,
  isStickyHeader,
  isPending,
  style,
  ...props
}: TitlesGridProps<T>) {
  const { width } = useWindowDimensions()
  const cardWidth = getCardWidth(width, numColumns, {
    gap: spacings.rowGap,
    paddingLeft: spacings.padding,
    paddingRight: spacings.padding
  })

  return (
    <Animated.FlatList
      data={titles}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => {
        const title = getTitle(item)

        return (
          <TitleCard
            label={title.name}
            type={title.type}
            coverUrl={title.coverUrl}
            {...(title.rating && { rating: toFixed(title.rating) })}
            width={cardWidth}
            withBadge
            onPress={() => {
              if (!title.key) return
              router.push(`/title/${title.type}/${title.key}`)
            }}
          />
        )
      }}
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
      keyboardDismissMode='on-drag'
      {...(isStickyHeader && { stickyHeaderIndices: [0] })}
      {...(header && { ListHeaderComponent: <View>{header}</View> })}
      ListEmptyComponent={
        isPending ? undefined : (
          <Text style={styles.emptyList}>
            {emptyText ?? 'Nothing here yet'}
          </Text>
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
