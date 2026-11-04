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
    columns = 3,
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

  const { width } = useWindowDimensions()
  const cardWidth = getCardWidth(width, columns, {
    gap: spacings.rowGap,
    paddingLeft: spacings.padding,
    paddingRight: spacings.padding
  })

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={keyExtractor}
      numColumns={columns}
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
