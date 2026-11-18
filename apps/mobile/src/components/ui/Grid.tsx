import { COLORS, FONT_SIZE, LAYOUT, SPACINGS } from '@app/tokens'
import { getCardWidth } from '@app/utils'
import type { ReactElement } from 'react'
import {
  type ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native'
import Animated, { type FlatListPropsWithLayout } from 'react-native-reanimated'

import { useSpaces } from '@/hooks'

import type { IGridOptions } from '@/types'

const BASE_WIDTH_DIVIDER = 430

type GridRenderItemInfo<T> = ListRenderItemInfo<T> & {
  cardWidth: number
}

export interface GridProps<T> extends Omit<
  FlatListPropsWithLayout<T>,
  'renderItem' | 'numColumns'
> {
  data: T[]
  keyExtractor: (item: T) => string
  renderItem: (info: GridRenderItemInfo<T>) => ReactElement | null
  options?: IGridOptions
}

export function Grid<T>({
  data,
  keyExtractor,
  renderItem,
  options,
  contentContainerStyle,
  ...props
}: GridProps<T>) {
  const {
    minColumns = 3,

    spacings = {
      colGap: SPACINGS[4],
      rowGap: SPACINGS[3],
      padding: LAYOUT['space-horizontal']
    },

    isPending,
    isStickyHeader,
    emptyText,
    header,
    topPaddingOffset = 0
  } = options ?? {}

  const { toolbarSpace } = useSpaces()

  const divider = BASE_WIDTH_DIVIDER / minColumns

  const { width } = useWindowDimensions()
  const colNum = Math.floor(width / divider)

  const cardWidth = getCardWidth(width, colNum, {
    gap: spacings.rowGap,
    paddingLeft: spacings.padding,
    paddingRight: spacings.padding
  })

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={keyExtractor}
      numColumns={minColumns}
      renderItem={info => renderItem({ ...info, cardWidth })}
      columnWrapperStyle={{ gap: spacings.rowGap }}
      contentContainerStyle={[
        {
          gap: spacings.colGap,
          paddingHorizontal: spacings.padding,
          paddingBottom: LAYOUT['space-vertical'],
          paddingTop: toolbarSpace + topPaddingOffset
        },
        contentContainerStyle
      ]}
      showsVerticalScrollIndicator={false}
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
