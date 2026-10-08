import type { Platform } from '@app/constants'

export const normalizePlatform = (platform: Platform): Platform => {
  if (platform.toLowerCase().includes('xbox')) {
    return 'Xbox One'
  }

  if (platform.toLowerCase().includes('playstation')) {
    return 'PlayStation 5'
  }

  return platform
}
