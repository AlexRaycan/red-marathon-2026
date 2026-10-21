import type { LibraryEntryResponse } from '@app/api'
import { toFixed } from '@app/utils'
import { router } from 'expo-router'

import { TitleCard } from '@/components/elements'

interface LibraryCardProps {
  title: LibraryEntryResponse
  width: number
}

export function LibraryCard({ title, width }: LibraryCardProps) {
  const { name, type, coverUrl, rating, key } = title.title
  return (
    <TitleCard
      label={name}
      type={type}
      coverUrl={coverUrl}
      rating={toFixed(rating)}
      width={width}
      withBadge
      onPress={() => {
        if (!key) return
        router.push(`/title/${type}/${key}`)
      }}
    />
  )
}
