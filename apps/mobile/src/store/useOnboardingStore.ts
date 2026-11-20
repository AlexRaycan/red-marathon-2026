import { STORAGE_KEYS } from '@app/constants'
import { create } from 'zustand'

import { SecureStore } from '@/utils'

type TDestination = '/' | '/register' | '/login'

interface OnboardingState {
  isCompleted: boolean | null
  completionRedirectTo: TDestination
  initialOnboardingStatus: () => Promise<void>
  completeOnboarding: (destination: TDestination) => Promise<void>
  resetRedirectTo: () => Promise<void>
  resetOnboarding: () => Promise<void>
}

const STORAGE_KEY = STORAGE_KEYS.ONBOARDING

export const useOnboardingStore = create<OnboardingState>(set => ({
  isCompleted: null,
  completionRedirectTo: '/',
  initialOnboardingStatus: async () =>
    SecureStore.getItemAsync(STORAGE_KEY).then(value =>
      set(() => ({
        isCompleted: value === 'true'
      }))
    ),
  completeOnboarding: async destination => {
    await SecureStore.setItemAsync(STORAGE_KEY, 'true')
    set(() => ({
      completionRedirectTo: destination,
      isCompleted: true
    }))
  },
  resetRedirectTo: async () => {
    set(() => ({
      completionRedirectTo: '/'
    }))
  },
  resetOnboarding: async () => {
    await SecureStore.setItemAsync(STORAGE_KEY, 'false')
    set(() => ({
      completionRedirectTo: '/',
      isCompleted: false
    }))
  }
}))
