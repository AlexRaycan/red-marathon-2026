export const MAIN_MENU = {
  index: 'For You',
  library: 'My Library',
  account: 'Account',
  search: 'Search'
} as const

export type MainMenu = keyof typeof MAIN_MENU

export const ACCOUNT_MENU_LABELS = {
  subscription: 'Subscription',
  watchlist: 'Watchlist',
  friends: 'Friends',
  notifications: 'Notifications'
} as const

export type AccountMenu = keyof typeof ACCOUNT_MENU_LABELS

export interface IAccountMenuItem {
  label: string
  path: string
  content?: string
}

export const ACCOUNT_MENU_ITEMS: Record<AccountMenu, IAccountMenuItem> = {
  subscription: {
    label: ACCOUNT_MENU_LABELS.subscription,
    content: 'Premium',
    path: '/subscription'
  },
  watchlist: {
    label: ACCOUNT_MENU_LABELS.watchlist,
    path: '/watchlist'
  },
  friends: {
    label: ACCOUNT_MENU_LABELS.friends,
    path: '/friends'
  },
  notifications: {
    label: ACCOUNT_MENU_LABELS.notifications,
    path: '/notifications'
  }
}
