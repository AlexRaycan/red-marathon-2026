import { SPACINGS } from '@app/tokens'

interface CardWidthOptions {
  gap?: number
  paddingLeft?: number
  paddingRight?: number
}

export function getCardWidth(
  containerWidth: number,
  visibleCount: number,
  {
    gap = SPACINGS[3],
    paddingLeft = 0,
    paddingRight = 0
  }: CardWidthOptions = {}
): number {
  const gapCount = Math.ceil(visibleCount) - 1
  const availableWidth = containerWidth - paddingLeft - paddingRight

  return (availableWidth - gap * gapCount) / visibleCount
}
