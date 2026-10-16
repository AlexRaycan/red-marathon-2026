import type { IPlan, IPlanFeature } from '@app/types'

export const PLANS: IPlan[] = [
  {
    id: 'monthly',
    price: '$3.99',
    name: 'Monthly',
    period: 'Billed monthly'
  },
  {
    id: 'annualy',
    price: '$29.99',
    name: 'Annualy',
    period: 'Billed annualy',
    badge: 'Saving 37%'
  }
]

export const PLAN_FEATURES: IPlanFeature[] = [
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
