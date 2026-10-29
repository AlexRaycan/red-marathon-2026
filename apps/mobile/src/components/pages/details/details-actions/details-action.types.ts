import type { Toggle } from '@expo/ui/swift-ui'
import type { ComponentProps } from 'react'

export type TSFSymbol = NonNullable<
  ComponentProps<typeof Toggle>['systemImage']
>
