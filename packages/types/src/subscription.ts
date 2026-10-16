export const SUBSCRIPTION_TYPES = {
  MONTHLY: 'monthly',
  ANNUALY: 'annualy'
} as const

export type TSubscriptionType =
  (typeof SUBSCRIPTION_TYPES)[keyof typeof SUBSCRIPTION_TYPES]

export interface ISubscription {
  id: TSubscriptionType
  price: string
  name: string
  trialPeriod: string
  period: string
  badge?: string
}

export interface ISubscriptionFeature {
  label: string
  isPremium: boolean
}
