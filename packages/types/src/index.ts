export const MEDIA_TYPES = ['movie', 'series', 'game', 'book'] as const

export type TMediaType = (typeof MEDIA_TYPES)[number]

export const STATUS_TYPES = ['want', 'progress', 'done'] as const

export type TStatus = (typeof STATUS_TYPES)[number]

export interface ICard {
  id: string
  type: TMediaType
  name: string
  year: number | null
  cover: string | null
  status: TStatus
}

export * from './ui'
