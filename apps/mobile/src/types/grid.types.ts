import type { ReactNode } from 'react'

export interface ISpacings {
  rowGap?: number
  colGap?: number
  padding?: number
}

export interface IGridOptions {
  columns?: number
  spacings?: ISpacings
  isStickyHeader?: boolean
  header?: ReactNode
  emptyText?: string
  isPending?: boolean | null
  topPaddingOffset?: number
  bottomPaddingOffset?: number
}
