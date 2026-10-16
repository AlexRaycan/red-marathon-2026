import { STORAGE_KEYS } from '@app/constants'
import { create } from 'zustand'

import { SecureStore } from '@/utils'

interface OnboardingState {
  isCompleted: boolean | null
  initialOnboardingStatus: () => Promise<void>
  completeOnboarding: () => Promise<void>
}

const STORAGE_KEY = STORAGE_KEYS.ONBOARDING

export const useOnboardingStore = create<OnboardingState>(set => ({
  isCompleted: null,
  initialOnboardingStatus: async () =>
    SecureStore.getItemAsync(STORAGE_KEY).then(value =>
      set(() => ({
        isCompleted: value === 'true'
      }))
    ),
  completeOnboarding: async () => {
    await SecureStore.setItemAsync(STORAGE_KEY, 'true')
    set(() => ({
      isCompleted: true
    }))
  }
}))
