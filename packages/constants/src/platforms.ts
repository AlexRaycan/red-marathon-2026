export const PLATFORMS_LIST = [
  'iOS',
  'Android',
  'macOS',
  'Linux',
  'PC',
  'Xbox Series S/X',
  'Xbox One',
  'PlayStation 4',
  'PlayStation 5',
  'PSP',
  'Nintendo Switch',
  'Wii',
  'Dreamcast',
  'Nintendo 64',
  'Nintendo DS',
  'GameCube'
] as const

export type Platform = (typeof PLATFORMS_LIST)[number]
