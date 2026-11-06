import type { TitleMetadataResponse } from '@app/api'

import { formatMinutes } from './format-minutes'

export function formatDuration(metadata: TitleMetadataResponse) {
  const { runtimeMinutes, episodeCount, episodeRuntimeMinutes, pageCount } =
    metadata

  const durationArray = []

  // Movie
  if (runtimeMinutes) durationArray.push(formatMinutes(runtimeMinutes))

  // Series count
  if (episodeCount) {
    const epSuffix = episodeCount > 1 ? 'episode' : 'episodes'

    durationArray.push(`${episodeCount} ${epSuffix}`)
  }

  // Episode duration
  if (episodeRuntimeMinutes) {
    durationArray.push(formatMinutes(episodeRuntimeMinutes))
  }

  // Book's pages
  if (pageCount && pageCount > 0) {
    const suffix = pageCount === 1 ? 'page' : 'pages'

    durationArray.push(`${pageCount} ${suffix}`)
  }

  const finalArray = durationArray.filter(Boolean)

  return finalArray.length > 0 ? finalArray : [null]
}
