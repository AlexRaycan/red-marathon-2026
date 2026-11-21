import { usePushRegistration } from '@/hooks/notifications/usePushRegistration'
import { usePushTapRouting } from '@/hooks/notifications/usePushTapRouting'

export default function NativePushNotifications() {
  usePushRegistration()
  usePushTapRouting()

  return null
}
