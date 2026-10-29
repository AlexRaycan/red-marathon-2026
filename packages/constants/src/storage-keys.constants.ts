export const STORAGE_KEYS = {
  ONBOARDING: 'onboardingCompleted',
  TOKENS: {
    ACCESS: 'accessToken',
    REFRESH: 'refreshToken'
  }
} as const

export type TStorage_KEYS = keyof typeof STORAGE_KEYS
