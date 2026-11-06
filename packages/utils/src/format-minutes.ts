import { convertMinsToHrs } from './convert-mins-to-hrs'

export function formatMinutes(value?: number | null) {
  if (value == null || value <= 0) return null

  const { hours, minutes } = convertMinsToHrs(value)

  return [hours ? `${hours}h` : null, minutes ? `${minutes}m` : null]
    .filter(Boolean)
    .join(' ')
}
