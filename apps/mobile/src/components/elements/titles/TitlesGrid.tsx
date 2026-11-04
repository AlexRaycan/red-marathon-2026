import type { TTitleGrid } from '@app/types'
import { toFixed } from '@app/utils'
import { router } from 'expo-router'

import { Grid, type GridProps } from '@/components/ui'

import { TitleCard } from './title-card'
import type { IGridOptions } from '@/types'

interface TitlesGridProps<T> extends Omit<
  GridProps<T>,
  'data' | 'renderItem' | 'keyExtractor' | 'onEndReached'
> {
  titles: T[]
  getTitle: (item: T) => TTitleGrid
  keyExtractor: (item: T) => string
  options?: IGridOptions
  onEndReached?: () => void
}

export function TitlesGrid<T>({
  titles,
  getTitle,
  keyExtractor,
  ...props
}: TitlesGridProps<T>) {
  return (
    <Grid
      data={titles}
      keyExtractor={keyExtractor}
      renderItem={({ item, cardWidth }) => {
        const title = getTitle(item)

        return (
          <TitleCard
            label={title.name}
            type={title.type}
            coverUrl={title.coverUrl}
            rating={title.rating == null ? undefined : toFixed(title.rating)}
            width={cardWidth}
            withBadge
            onPress={() => {
              if (!title.key) return
              router.push(`/title/${title.type}/${title.key}`)
            }}
          />
        )
      }}
      {...props}
    />
  )
}
