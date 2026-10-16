export const SPACINGS = {
  ['0.5']: 2,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  16: 64,
  20: 80,
  24: 96
} as const

export const LAYOUT = {
  'space-horizontal': SPACINGS[4],
  'space-vertical': SPACINGS[4]
} as const

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999
} as const

export const DURATION = {
  fast: 150,
  normal: 250,
  slow: 400
} as const
