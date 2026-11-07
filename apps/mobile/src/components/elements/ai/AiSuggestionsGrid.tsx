import type { DiscoverItemResponse } from '@app/api'
import { LAYOUT, SPACINGS } from '@app/tokens'
import { getCardWidth, toFixed } from '@app/utils'
import { StyleSheet, View, useWindowDimensions } from 'react-native'

import { useProtectedPush, useSpaces } from '@/hooks'

import { TitleCard } from '../titles'

const GAP = SPACINGS[3]

interface AiSuggestionsGridProps {
  suggestions: DiscoverItemResponse[]
}

export function AiSuggestionsGrid({ suggestions }: AiSuggestionsGridProps) {
  const { width } = useWindowDimensions()
  const cardWidth = getCardWidth(width, 3, {
    gap: GAP,
    paddingLeft: LAYOUT['space-horizontal'],
    paddingRight: LAYOUT['space-horizontal']
  })

  const { tabbarSpace } = useSpaces()

  const protectedPush = useProtectedPush()

  return (
    <View style={[styles.grid, { paddingBottom: tabbarSpace }]}>
      {suggestions.map(item => (
        <TitleCard
          key={item.key}
          titleKey={item.key}
          label={item.name}
          type={item.type}
          coverUrl={item.coverUrl}
          rating={item.rating ? toFixed(item.rating) : undefined}
          width={cardWidth}
          withBadge
          onPress={() => {
            if (!item.key) return
            protectedPush(`/title/${item.type}/${item.key}`)
          }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP
  }
})
