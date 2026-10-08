import { router } from 'expo-router'
import { Bell, CreditCard, Heart, Users2 } from 'lucide-react-native'

export const ACCOUNT_MENU_ITEMS = [
  {
    label: 'Subscription',
    icon: CreditCard,
    content: 'Premium',
    onPress: () => router.push('/subscription')
  },
  {
    label: 'Watchlist',
    icon: Heart,
    onPress: () => router.push('/library')
  },
  {
    label: 'Friends',
    icon: Users2,
    onPress: () => router.push('/')
  },
  {
    label: 'Notifications',
    icon: Bell,
    onPress: () => router.push('/')
  }
]
