import type { DiscoverDetailsResponse } from '@app/api'
import { LAYOUT, SPACINGS } from '@app/tokens'
import { StyleSheet, View } from 'react-native'

import { ViewLayout } from '@/components/ui'

import { TITLE_CARD_CONFIG, TitlesCarousel } from '@/components/elements'

import { useSpaces } from '@/hooks'

import { AiSummary } from './ai-summary'
import { CastCarousel } from './cast'
import { DetailsActions } from './details-actions'
import { HeroDetailsTitle } from './hero'
import { RatingBadge } from './rating-badge'
import { ReviewsSection } from './reviews-section'

interface DetailsInfoProps {
  title: DiscoverDetailsResponse
  heroHeight: number
}

export function DetailsInfo({ title, heroHeight }: DetailsInfoProps) {
  const { tabbarSpace: bottomSpace } = useSpaces()

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

      <View style={styles.ratingContainer}>
        <RatingBadge
          source={title.externalSource}
          rating={title.rating}
          metacritic={title.metadata.metacritic}
        />
      </View>

      <DetailsActions
        title={title}
        accentColor={accentColor}
      />

      <AiSummary titleKy={title.key} />

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
  },
  ratingContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: LAYOUT['space-horizontal']
  }
})
