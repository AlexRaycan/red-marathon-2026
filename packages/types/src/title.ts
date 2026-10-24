import type { ExternalTitleResponse } from '@app/api'
import type { TYPE_LABELS } from '@app/constants'

export type TTitleType = keyof typeof TYPE_LABELS

export type TTitleGrid = Pick<
  ExternalTitleResponse,
  'name' | 'type' | 'coverUrl' | 'rating'
> & {
  key: string | null
}
