import type { BottomSheet } from '@expo/ui/community/bottom-sheet'
import type { RefObject } from 'react'

export function useOpenBottomSheet(ref: RefObject<BottomSheet | null>) {
  return {
    open: () => ref.current?.snapToIndex(0)
  }
}
