import type { DiscoverDetailsResponse } from '@app/api'
import { SPACINGS } from '@app/tokens'
import { StyleSheet } from 'react-native'
import Animated, { type AnimatedScrollViewProps } from 'react-native-reanimated'

import { ViewLayout } from '@/components/ui'

import { TITLE_CARD_CONFIG, TitlesCarousel } from '@/components/elements'

import { useBottomSpace } from '@/hooks'

import { CastCarousel } from './cast'
import { DetailsActions } from './details-actions'
import { DetailsTitle } from './hero'
import { ReviewsSection } from './reviews-section'

interface DetailsInfoProps extends AnimatedScrollViewProps {
  title: DiscoverDetailsResponse
  heroHeight: number
  isAuthenticated: boolean
}

export function DetailsInfo({
  title,
  heroHeight,
  isAuthenticated,
  ...props
}: DetailsInfoProps) {
  const { bottomSpace } = useBottomSpace()

  const hasCast = !!title.cast?.length || !!title.creators?.length

  const config = TITLE_CARD_CONFIG[title.type]
  const accentColor = config.accent

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: bottomSpace
      }}
      scrollEventThrottle={16}
      {...props}
    >
      <ViewLayout.Root
        style={[
          styles.root,
          {
            paddingBottom: bottomSpace
          }
        ]}
      >
        <DetailsTitle
          title={title}
          heroHeight={heroHeight}
        />

        <DetailsActions
          title={title}
          accentColor={accentColor}
          isAuthenticated={isAuthenticated}
        />

        {!!title?.similar?.length && (
          <TitlesCarousel
            title='You may also like'
            items={title.similar}
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
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    gap: SPACINGS[5]
  }
})
