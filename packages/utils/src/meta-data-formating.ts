import type { DiscoverDetailsResponse } from '@app/api'

import { convertMinsToHrs } from './convert-mins-to-hrs'
import { firstLetterUpperCase } from './first-letter-upper-case'
import { getDate } from './get-date'

export function metaDataFormating(title: DiscoverDetailsResponse) {
  const { year } = getDate(title.releaseDate)

  const metadata = Object.entries(title.metadata).map(([key, val]) => {
    switch (key) {
      case 'averagePlaytimeHours':
        return `${val}h`
      case 'runtimeMinutes': {
        const { hours, minutes } = convertMinsToHrs(Number(val))

        return `${hours}h ${minutes}m`
      }
      case 'platforms':
        break
      default: {
        return `${firstLetterUpperCase(key)}: ${val}`
      }
    }
  })

  return [year, ...metadata, title.ageRating].filter(Boolean).join(' • ')
}
