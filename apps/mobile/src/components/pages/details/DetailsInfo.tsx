import type { DiscoverDetailsResponse } from '@app/api'
import { SPACINGS } from '@app/tokens'
import { StyleSheet } from 'react-native'

import { ViewLayout } from '@/components/ui'

import { TITLE_CARD_CONFIG, TitlesCarousel } from '@/components/elements'

import { useBottomSpace } from '@/hooks'

import { CastCarousel } from './cast'
import { DetailsActions } from './details-actions'
import { HeroDetailsTitle } from './hero'
import { ReviewsSection } from './reviews-section'

interface DetailsInfoProps {
  title: DiscoverDetailsResponse
  heroHeight: number
}

export function DetailsInfo({ title, heroHeight }: DetailsInfoProps) {
  const { bottomSpace } = useBottomSpace()

  const hasCast = !!title.cast?.length || !!title.creators?.length

  const config = TITLE_CARD_CONFIG[title.type]
  const accentColor = config.accent

  return (
    <ViewLayout.Root
      style={[
        styles.root,
        {
          paddingBottom: bottomSpace
        }
      ]}
    >
      <HeroDetailsTitle
        title={title}
        heroHeight={heroHeight}
      />

      <DetailsActions
        title={title}
        accentColor={accentColor}
      />

      {!!title?.similar?.length && (
        <TitlesCarousel
          title='You may also like'
          titles={title.similar}
        />
      )}

      {hasCast && (
        <CastCarousel
          type={title.type}
          creators={title.creators}
          cast={title.cast}
        />
      )}

      <ReviewsSection titleKey={title.key} />
    </ViewLayout.Root>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    gap: SPACINGS[5]
  }
})
