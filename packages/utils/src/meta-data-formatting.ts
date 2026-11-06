import type { DiscoverDetailsResponse } from '@app/api'

import { formatDuration } from './format-duration'
import { getAgeRating } from './get-age-rating'
import { getDate } from './get-date'
import { getJoinedArray } from './get-joined-array'

export function metaDataFormatting(
  title: Pick<DiscoverDetailsResponse, 'releaseDate' | 'metadata' | 'ageRating'>
) {
  const { year } = getDate(title.releaseDate)
  const { metacritic } = title.metadata

  const ageRating = getAgeRating(title.ageRating)

  const formattedDuration = formatDuration(title.metadata)

  const metadata = [
    ...formattedDuration,

    // Metacritic rating
    metacritic != null ? `Metacritic: ${metacritic}/100` : null
  ]

  return getJoinedArray([year, ...metadata, ageRating])
}
