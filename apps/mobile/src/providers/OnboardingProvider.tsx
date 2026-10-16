import {
  type PropsWithChildren,
  createContext,
  use,
  useEffect,
  useState
} from 'react'

import { SecureStore } from '@/utils'

const STORAGE_KEY = 'onboardingCompleted'

const OnboardingContext = createContext<{
  isCompleted: boolean
  completeOnboarding: () => Promise<void>
} | null>(null)

export function OnboardingProvider({ children }: PropsWithChildren) {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null)

  useEffect(() => {
    void SecureStore.getItemAsync(STORAGE_KEY).then(value =>
      setIsCompleted(value === 'true')
    )
  }, [])

  const completeOnboarding = async () => {
    await SecureStore.setItemAsync(STORAGE_KEY, 'true')
    setIsCompleted(true)
  }

  if (isCompleted === null) return null

  return (
    <OnboardingContext value={{ isCompleted, completeOnboarding }}>
      {children}
    </OnboardingContext>
  )
}

export const useOnboarding = () => {
  const context = use(OnboardingContext)

  if (!context) {
    throw new Error('useOnboarding must be used inside OnboardingProvider')
  }

  return context
}
