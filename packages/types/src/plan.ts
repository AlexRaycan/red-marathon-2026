export interface IPlan {
  id: string
  price: string
  name: string
  period: string
  badge?: string
}

export interface IPlanFeature {
  label: string
  isPremium: boolean
}
