import type { LibraryEntryResponse } from '@app/api'
import { COLORS, FONT_SIZE, LAYOUT, SPACINGS } from '@app/tokens'
import { getCardWidth } from '@app/utils'
import { router } from 'expo-router'
import { StyleSheet, Text, useWindowDimensions } from 'react-native'
import Animated from 'react-native-reanimated'

import { TitleCard } from './title-card'

interface ISpacings {
  rowGap?: number
  colGap?: number
  padding?: number
}

interface TitlesGridProps {
  titles: LibraryEntryResponse[]
  numColums?: number
  spacings?: ISpacings
  isPending?: boolean | null
}

export function TitlesGrid({
  titles,
  numColums = 3,
  spacings = {
    colGap: SPACINGS[4],
    rowGap: SPACINGS[3],
    padding: LAYOUT['space-horizontal']
  },
  isPending
}: TitlesGridProps) {
  const { width } = useWindowDimensions()
  const cardWidth = getCardWidth(width, numColums, {
    gap: spacings.rowGap,
    paddingLeft: spacings.padding,
    paddingRight: spacings.padding
  })

  return (
    <Animated.FlatList
      data={titles}
      keyExtractor={title => title.id}
      renderItem={({ item: title }) => (
        <TitleCard
          label={title.title.name}
          type={title.title.type}
          coverUrl={title.title.coverUrl}
          width={cardWidth}
          withBadge
          onPress={() => {
            if (!title?.title?.key) return
            router.push(`/title/${title.title.type}/${title.title.key}`)
          }}
        />
      )}
      numColumns={numColums}
      columnWrapperStyle={{ gap: spacings.rowGap }}
      contentContainerStyle={{
        flex: 1,
        gap: spacings.colGap,
        padding: spacings.padding
      }}
      ListEmptyComponent={
        isPending ? null : (
          <Text style={styles.emptyList}>Nothing here yet</Text>
        )
      }
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
