import type { DiscoverDetailsResponse } from '@app/api'

import { convertMinsToHrs } from './convert-mins-to-hrs'
import { getDate } from './get-date'

function formatDuration(value: number | null | undefined) {
  if (value == null || value <= 0) return null

  const { hours, minutes } = convertMinsToHrs(value)

  return [hours ? `${hours}h` : null, minutes ? `${minutes}m` : null]
    .filter(Boolean)
    .join(' ')
}

export function metaDataFormating(
  title: Pick<DiscoverDetailsResponse, 'releaseDate' | 'metadata' | 'ageRating'>
) {
  const { year } = getDate(title.releaseDate)
  const {
    runtimeMinutes,
    episodeCount,
    episodeRuntimeMinutes,
    pageCount,
    metacritic
  } = title.metadata
  const episodeDuration = formatDuration(episodeRuntimeMinutes)
  const metadata = [
    formatDuration(runtimeMinutes),
    episodeCount != null && episodeCount > 0
      ? `${episodeCount} ${episodeCount === 1 ? 'episode' : 'episodes'}`
      : null,
    episodeDuration ? `${episodeDuration}/ep` : null,
    pageCount != null && pageCount > 0
      ? `${pageCount} ${pageCount === 1 ? 'page' : 'pages'}`
      : null,
    metacritic != null ? `Metacritic: ${metacritic}/100` : null
  ]

  return [year, ...metadata, title.ageRating].filter(Boolean).join(' • ')
}
