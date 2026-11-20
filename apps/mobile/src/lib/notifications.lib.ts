import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import type { Href } from 'expo-router'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

export async function getPushToken() {
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

  const { data } = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig?.extra?.eas.projectId
  })

  return data
}

export function getNotificationHref(
  entityType: unknown,
  entityId: unknown
): Extract<Href, string> | null {
  if (typeof entityId !== 'string') return null

  switch (entityType) {
    case 'COLLECTION':
      return `/collections/${entityId}`
    default:
      return `/title/${entityType}/${entityId}`
  }
}
