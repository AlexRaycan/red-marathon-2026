import { ACCOUNT_MENU_ITEMS, type IAccountMenuItem } from '@app/constants'
import { router } from 'expo-router'
import {
  Bell,
  CreditCard,
  Heart,
  type LucideIcon,
  Users2
} from 'lucide-react-native'

export interface AccountMenuItemProps extends Omit<IAccountMenuItem, 'path'> {
  icon: LucideIcon
  onPress?: () => void
}

// FIXME: solve problem with string in the `router.push(...)`
export const ACCOUNT_MENU: AccountMenuItemProps[] = [
  {
    label: 'Subscription',
    icon: CreditCard,
    content: ACCOUNT_MENU_ITEMS.subscription.content,
    onPress: () => router.push(ACCOUNT_MENU_ITEMS.subscription.path)
  },
  {
    label: 'Watchlist',
    icon: Heart,
    onPress: () => router.push(ACCOUNT_MENU_ITEMS.watchlist.path)
  },
  {
    label: 'Friends',
    icon: Users2,
    onPress: () => router.push(ACCOUNT_MENU_ITEMS.friends.path)
  },
  {
    label: 'Notifications',
    icon: Bell,
    onPress: () => router.push(ACCOUNT_MENU_ITEMS.notifications.path)
  }
]
