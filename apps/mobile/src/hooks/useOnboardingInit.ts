import { useEffect } from 'react'

import { useOnboardingStore } from '@/store'

export function useOnboardingInit() {
  const initBoarding = useOnboardingStore(
    state => state.initialOnboardingStatus
  )

  useEffect(() => {
    initBoarding().catch(error =>
      console.error('Onboarding loading was failed', error)
    )
  }, [initBoarding])
}
