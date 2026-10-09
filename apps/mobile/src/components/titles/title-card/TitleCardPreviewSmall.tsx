import type { DiscoverDetailsResponse, DiscoverItemResponse } from '@app/api'
import { RADIUS } from '@app/tokens'

import { TitleCard } from './TitleCard'

interface TitleCardPreviewSmallProps {
  title: Pick<
    DiscoverItemResponse | DiscoverDetailsResponse,
    'type' | 'coverUrl'
  >
}

export function TitleCardPreviewSmall({ title }: TitleCardPreviewSmallProps) {
  return (
    <TitleCard
      title={title}
      width={30}
      borderRadius={RADIUS.sm}
    />
  )
}
