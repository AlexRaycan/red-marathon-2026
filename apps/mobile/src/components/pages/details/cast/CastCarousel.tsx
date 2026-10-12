import type { DiscoverDetailsResponse } from '@app/api'
import { TYPE_LABELS } from '@app/constants'

import { Carousel } from '@/components/elements'

import { CastCard } from './CastCard'

interface CastCarouselProps {
  title: Pick<DiscoverDetailsResponse, 'type' | 'creators' | 'cast'>
}

export function CastCarousel({ title }: CastCarouselProps) {
  return (
    <Carousel
      title={
        title.type === TYPE_LABELS.GAME.toUpperCase() ? 'Developers' : 'Cast'
      }
    >
      {/* TODO: add separate view for developers */}
      {/* TODO: use CREATOR_ROLES_LABELS for carousels' labels */}
      {title.creators.map(creator => (
        <CastCard
          key={creator.name}
          type='creator'
          name={creator.name}
          role={creator.role}
          photoUrl={creator.photoUrl}
        />
      ))}

      {title.cast.slice(0, 10).map(actor => (
        <CastCard
          key={actor.name}
          type='actor'
          name={actor.name}
          photoUrl={actor.photoUrl}
        />
      ))}
    </Carousel>
  )
}
