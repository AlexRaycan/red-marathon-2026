export const normalizePlatform = (platform: string): string => {
  if (platform.toLowerCase().includes('xbox')) {
    return 'Xbox One'
  }

  if (platform.toLowerCase().includes('playstation')) {
    return 'PlayStation 5'
  }

  return platform
}
