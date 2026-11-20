import { Bell } from 'lucide-react-native'

import { Button } from '@/components/ui'

import { useProtectedPush } from '@/hooks'

export function NotificationButton() {
  const pushProtected = useProtectedPush()

  return (
    <Button
      variant='transparent'
      icon={Bell}
      size='lg'
      onPress={() => pushProtected('/notifications')}
    />
  )
}
