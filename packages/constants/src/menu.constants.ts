export const MAIN_MENU = {
  index: 'For You',
  library: 'My Library',
  'ai-picker': 'AI Picker',
  account: 'Account',
  login: 'Log In',
  search: 'Search'
} as const

export type MainMenu = keyof typeof MAIN_MENU

export const ACCOUNT_MENU_LABELS = {
  subscription: 'Subscription',
  collections: 'Collections',
  friends: 'Friends',
  notifications: 'Notifications'
} as const

export type AccountMenu = keyof typeof ACCOUNT_MENU_LABELS

export interface IAccountMenuItem {
  value: AccountMenu
  label: (typeof ACCOUNT_MENU_LABELS)[keyof typeof ACCOUNT_MENU_LABELS]
  path: string
  content?: string
}

export const ACCOUNT_MENU_ITEMS: IAccountMenuItem[] = [
  {
    value: 'subscription',
    label: ACCOUNT_MENU_LABELS.subscription,
    content: 'Premium',
    path: '/subscriptions'
  },
  {
    value: 'collections',
    label: ACCOUNT_MENU_LABELS.collections,
    path: '/collections'
  },
  {
    value: 'friends',
    label: ACCOUNT_MENU_LABELS.friends,
    path: '/friends'
  },
  {
    value: 'notifications',
    label: ACCOUNT_MENU_LABELS.notifications,
    path: '/notifications'
  }
] as const
