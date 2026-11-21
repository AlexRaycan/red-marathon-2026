import { PushTokenDtoPlatform, useRegisterPushToken } from '@app/api'
import { useAuth } from '@app/hooks'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

async function getPushToken() {
  if (!Device.isDevice) return null

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.DEFAULT
    })
  }

  const current = await Notifications.getPermissionsAsync()

  const { granted } = current.granted
    ? current
    : await Notifications.requestPermissionsAsync()

  if (!granted) return null

  const { data } = await Notifications.getExpoPushTokenAsync()

  return data
}

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
