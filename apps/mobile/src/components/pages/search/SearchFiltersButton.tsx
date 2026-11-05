import { useSearchFilterStore } from '@app/store'
import { COLORS } from '@app/tokens'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { SlidersHorizontal } from 'lucide-react-native'
import { useRef } from 'react'

import { Button } from '@/components/ui'

import { useBottomSheetControl } from '@/hooks'

import { SearchFiltersSheetSheet } from './SearchFiltersSheet'

export function SearchFiltersButton() {
  const sheetRef = useRef<BottomSheet>(null)
  const { open } = useBottomSheetControl(sheetRef)

  const { genres, yearFrom, yearTo } = useSearchFilterStore()

  const hasFilters = !!genres.length || !!yearFrom || !!yearTo

  return (
    <>
      <Button
        icon={SlidersHorizontal}
        variant='secondary'
        {...(hasFilters && { tintColor: COLORS.status.success })}
        onPress={open}
      />

      <SearchFiltersSheetSheet ref={sheetRef} />
    </>
  )
}
