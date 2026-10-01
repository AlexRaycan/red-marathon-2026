import { SPACINGS } from '@app/tokens'

export function getCardWidth(windowWidth: number, divider?: number): number {
  const cardCountPerScreen = Math.trunc(windowWidth / 110)
  const cardCountMultiplier = cardCountPerScreen * (1.05 / (divider ?? 1))
  const totalGap = SPACINGS[3] * (cardCountPerScreen + 1)

  return (windowWidth - totalGap) / cardCountMultiplier
}
