import type { DiscoverDetailsResponse, DiscoverItemResponse } from '@app/api'

import { getDate } from './get-date'

export function getTitleHeading(
  title: Pick<
    DiscoverDetailsResponse | DiscoverItemResponse,
    'name' | 'releaseDate'
  >
) {
  const { name, releaseDate } = title
  const { year } = getDate(releaseDate)

  return `${name}${year ? ` (${year})` : ''}`
}
