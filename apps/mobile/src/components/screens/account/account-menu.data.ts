import {
  ACCOUNT_MENU_ITEMS,
  ACCOUNT_MENU_ITEMS_BILLED,
  type AccountMenu,
  type IAccountMenuItem,
  IS_BILLING_ENABLED
} from '@app/constants'
import type { Href } from 'expo-router'
import {
  Bell,
  CreditCard,
  Layers,
  type LucideIcon,
  Users2
} from 'lucide-react-native'

export interface AccountMenuItemProps extends Omit<IAccountMenuItem, 'path'> {
  path: Href
  icon: LucideIcon
}

const ACCOUNT_MENU_ICONS: Record<AccountMenu, LucideIcon> = {
  subscription: CreditCard,
  collections: Layers,
  friends: Users2,
  notifications: Bell
}

const MENU_ITEMS = IS_BILLING_ENABLED
  ? ACCOUNT_MENU_ITEMS_BILLED
  : ACCOUNT_MENU_ITEMS

export const ACCOUNT_MENU: AccountMenuItemProps[] = MENU_ITEMS.map(item => ({
  ...item,
  path: item.path as Href,
  icon: ACCOUNT_MENU_ICONS[item.value]
}))
