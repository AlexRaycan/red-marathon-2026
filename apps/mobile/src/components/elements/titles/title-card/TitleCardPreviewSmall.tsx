import type { DiscoverItemResponseType } from '@app/api'
import { RADIUS } from '@app/tokens'

import { TitleCard } from './TitleCard'

interface TitleCardPreviewSmallProps {
  type: DiscoverItemResponseType
  coverUrl: string | null
}

export function TitleCardPreviewSmall(props: TitleCardPreviewSmallProps) {
  return (
    <TitleCard
      width={30}
      borderRadius={RADIUS.sm}
      {...props}
    />
  )
}
