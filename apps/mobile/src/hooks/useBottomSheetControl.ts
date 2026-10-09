import type { BottomSheet } from '@expo/ui/community/bottom-sheet'
import { type RefObject, useCallback } from 'react'

export function useBottomSheetControl(ref: RefObject<BottomSheet | null>) {
  const open = useCallback(() => {
    ref.current?.snapToIndex(0)
  }, [ref])

  const close = useCallback(() => {
    ref.current?.close()
  }, [ref])

  return {
    open,
    close
  }
}
