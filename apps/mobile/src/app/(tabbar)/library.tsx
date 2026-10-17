import { useLibraryFindAll } from '@app/api'
import { useAuth } from '@app/hooks'
import { COLORS, FONT_SIZE, LAYOUT, SPACINGS } from '@app/tokens'
import { type TLibraryStatus } from '@app/types'
import { getCardWidth } from '@app/utils'
import { Redirect } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, useWindowDimensions } from 'react-native'
import Animated from 'react-native-reanimated'

import { Screen } from '@/components/ui'

import { TitleCard, Toolbar } from '@/components/elements'
import { StatusFilter } from '@/components/pages/library'

const ROW_GAP = SPACINGS[3]
const COLUMN_GAP = SPACINGS[4]
const PADDINGS = LAYOUT['space-horizontal']

export default function Library() {
  const { user, isLoading, isError } = useAuth()
  const [status, setStatus] = useState<TLibraryStatus | null>(null)
  const { width } = useWindowDimensions()
  const cardWidth = getCardWidth(width, 3, {
    gap: ROW_GAP,
    paddingLeft: PADDINGS,
    paddingRight: PADDINGS
  })

  const { data, isPending } = useLibraryFindAll(
    {
      status: status ? [status] : undefined,
      take: 27
    },
    {
      query: { enabled: !!user }
    }
  )

  if (isLoading) return <Screen />

  if (isError || !user) return <Redirect href={'/login'} />

  const entries = data?.status === 200 ? data.data.items : []

  return (
    <Screen>
      <Toolbar
        leftSide='Library'
        withHorPaddings
        titleSize={FONT_SIZE['3xl']}
      />

      <StatusFilter
        value={status}
        onChange={setStatus}
      />

      <Animated.FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TitleCard
            label={item.title.name}
            type={item.title.type}
            coverUrl={item.title.coverUrl}
            width={cardWidth}
            withBadge
          />
        )}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          isPending ? null : (
            <Text style={styles.emptyList}>Nothing here yet</Text>
          )
        }
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: COLUMN_GAP,
    padding: LAYOUT['space-horizontal']
  },
  row: { gap: ROW_GAP },
  emptyList: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center'
  }
})
