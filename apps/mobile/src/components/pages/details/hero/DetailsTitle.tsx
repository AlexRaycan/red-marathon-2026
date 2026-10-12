import type { DiscoverDetailsResponse } from '@app/api'
import { LAYOUT, SPACINGS } from '@app/tokens'
import { metaDataFormating } from '@app/utils'
import { StyleSheet } from 'react-native'

import { ViewLayout } from '@/components/ui'

import { HeroTitleInfo } from '@/components/hero'

import { DetailsPlatforms } from '../details-platforms'

interface DetailsTitleProps {
  title: DiscoverDetailsResponse
  heroHeight: number
}

export function DetailsTitle({ title, heroHeight }: DetailsTitleProps) {
  const meta = metaDataFormating(title)

  return (
    <ViewLayout.Root
      style={[
        styles.baseContainer,
        styles.descriptionContainer,
        { height: heroHeight }
      ]}
    >
      <HeroTitleInfo
        keyItem={title.key}
        name={title.name}
        genres={title.genres}
        meta={meta}
        platforms={
          title.metadata.platforms ? (
            <DetailsPlatforms metadata={title.metadata} />
          ) : null
        }
        description={title.description}
        descriptionLines={4}
      />
    </ViewLayout.Root>
  )
}

const styles = StyleSheet.create({
  baseContainer: {
    marginHorizontal: LAYOUT['space-horizontal']
  },
  descriptionContainer: {
    gap: SPACINGS[4],
    justifyContent: 'flex-end'
  }
})
