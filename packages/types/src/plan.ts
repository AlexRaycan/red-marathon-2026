export interface ISubscription {
  id: string
  price: string
  name: string
  period: string
  badge?: string
}

export interface ISubscriptionFeature {
  label: string
  isPremium: boolean
}
