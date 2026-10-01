export const PLATFORMS_LIST = [
  'Linux',
  'PC',
  'Xbox Series S/X',
  'Xbox One',
  'PlayStation 4',
  'PlayStation 5',
  'Nintendo Switch'
] as const

export type Platform = (typeof PLATFORMS_LIST)[number]
