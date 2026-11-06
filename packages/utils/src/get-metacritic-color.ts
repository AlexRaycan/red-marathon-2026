import { METACRITIC, METACRITIC_COLORS } from '@app/constants'

export function getMetacriticColor(score: number) {
  if (score >= METACRITIC.goodScore) return METACRITIC_COLORS.good
  if (score >= METACRITIC.mixedScore) return METACRITIC_COLORS.mixed

  return METACRITIC_COLORS.bad
}
