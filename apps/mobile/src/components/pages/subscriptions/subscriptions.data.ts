import type { ISubscription, ISubscriptionFeature } from '@app/types'

export const SUBSCRIPTIONS: ISubscription[] = [
  {
    id: 'monthly',
    price: '$3.99',
    name: 'Monthly',
    trialPeriod: '7-Days free trial',
    period: 'Month'
  },
  {
    id: 'annualy',
    price: '$29.99',
    name: 'Annualy',
    trialPeriod: '14-Days free trial',
    period: 'Annual',
    badge: 'Saving 37%'
  }
]

export const SUBSCRIPTION_FEATURES: ISubscriptionFeature[] = [
  {
    label: 'Movies, series, anime, books, and games',
    isPremium: false
  },
  {
    label: 'Ratings and reviews',
    isPremium: false
  },
  {
    label: 'Collections',
    isPremium: false
  },
  {
    label: 'AI Picker',
    isPremium: true
  },
  {
    label: 'Spoiler-free AI summaries',
    isPremium: true
  },
  {
    label: 'Full Taste DNA',
    isPremium: true
  }
]
