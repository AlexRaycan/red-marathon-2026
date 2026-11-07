import {
  ACCOUNT_MENU_ITEMS,
  type AccountMenu,
  type IAccountMenuItem
} from '@app/constants'
import {
  Bell,
  CreditCard,
  Layers,
  type LucideIcon,
  Users2
} from 'lucide-react-native'

export interface AccountMenuItemProps extends IAccountMenuItem {
  icon: LucideIcon
}

const ACCOUNT_MENU_ICONS: Record<AccountMenu, LucideIcon> = {
  subscription: CreditCard,
  collections: Layers,
  friends: Users2,
  notifications: Bell
}

export const ACCOUNT_MENU: AccountMenuItemProps[] = ACCOUNT_MENU_ITEMS.map(
  item => ({
    ...item,
    icon: ACCOUNT_MENU_ICONS[item.value]
  })
)
