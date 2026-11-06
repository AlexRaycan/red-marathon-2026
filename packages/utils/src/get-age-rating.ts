import { AGE_RATING_LABELS } from '@app/constants'

export function getAgeRating(ageRating: string | null) {
  if (!ageRating) return null

  const age = Object.entries(AGE_RATING_LABELS).find(item =>
    item[1].includes(ageRating)
  )

  return age?.[0] ?? ageRating
}
