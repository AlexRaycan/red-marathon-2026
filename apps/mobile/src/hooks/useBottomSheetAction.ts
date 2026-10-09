import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { type RefObject, useCallback } from 'react'

import { useOpenBottomSheet } from './useOpenBottomSheet'
import { BOTTOM_SHEET_ACTIONS } from '@/constants'
import type { TBottomSheetActions } from '@/types'

export function useBottomSheetAction(
  ref: RefObject<BottomSheet | null>,
  sheet: TBottomSheetActions,
  enabled = false
) {
  const { action } = useLocalSearchParams<{ action?: string }>()
  const { open } = useOpenBottomSheet(ref)

  const handleAction = useCallback(() => {
    if (!enabled || action !== BOTTOM_SHEET_ACTIONS[sheet]) {
      return
    }

    const bottomSheet = ref.current

    if (!bottomSheet) return

    open()
    router.setParams({ action: undefined })
  }, [action, enabled, open, ref, sheet])

  useFocusEffect(handleAction)
}
