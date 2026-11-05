import type { ExternalTitleResponse, TitleListItemResponseType } from '@app/api'

export type TTitleType = TitleListItemResponseType

export type TTitleGrid = Pick<
  ExternalTitleResponse,
  'name' | 'type' | 'coverUrl' | 'rating'
> & {
  key: string | null
}
