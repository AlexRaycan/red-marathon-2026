import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { type RefObject } from 'react'
import { StyleSheet } from 'react-native'

import { BottomSheetWindow } from '@/components/ui'

import { YearSelector } from './YearSelector'

interface YearSelectorSheetProps {
  label: string
  value: number | null
  minYear?: number | null
  maxYear?: number | null
  ref: RefObject<BottomSheet | null>
  onChange: (year: number | null) => void
}

export function YearSelectorSheet({
  value,
  minYear,
  maxYear,
  ref,
  onChange
}: YearSelectorSheetProps) {
  return (
    <BottomSheetWindow
      ref={ref}
      footerDirection='row'
      hasCancelButton={false}
      submitButtonText='Apply'
    >
      <YearSelector
        label='From'
        value={value}
        {...(minYear !== undefined && { minYear })}
        {...(maxYear !== undefined && { maxYear })}
        onChange={onChange}
      />
    </BottomSheetWindow>
  )
}

const styles = StyleSheet.create({})
