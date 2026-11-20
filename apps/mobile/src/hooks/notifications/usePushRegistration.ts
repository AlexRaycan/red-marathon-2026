import { PushTokenDtoPlatform, useRegisterPushToken } from '@app/api'
import { useAuth } from '@app/hooks'
import { useEffect } from 'react'
import { Platform } from 'react-native'

import { getPushToken } from '@/lib'

export function usePushRegistration() {
  const { isAuthenticated } = useAuth()
  const { mutate: registerToken } = useRegisterPushToken()

  useEffect(() => {
    if (!isAuthenticated) return

    let isActive = true

    void getPushToken().then(token => {
      if (!token || !isActive) return

      registerToken({
        data: {
          token,
          platform:
            Platform.OS === 'ios'
              ? PushTokenDtoPlatform.IOS
              : PushTokenDtoPlatform.ANDROID
        }
      })
    })

    return () => {
      isActive = false
    }
  }, [isAuthenticated, registerToken])
}
