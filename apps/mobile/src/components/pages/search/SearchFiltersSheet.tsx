import { useExternalGenres } from '@app/api'
import { useSearchFilterStore } from '@app/store'
import { COLORS, FONT_SIZE, LAYOUT, SPACINGS } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { CalendarArrowDown, CalendarArrowUp } from 'lucide-react-native'
import { type RefObject, useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { BottomSheetWindow, Button } from '@/components/ui'

import { useBottomSheetControl } from '@/hooks'

import { GenreChips } from './GenreChips'
import { YearSelectorSheet } from './YearSelectorSheet'

interface SearchFiltersSheetSheetProps {
  ref: RefObject<BottomSheet | null>
}

export function SearchFiltersSheetSheet({ ref }: SearchFiltersSheetSheetProps) {
  const { data } = useExternalGenres()

  const {
    genres,
    yearFrom,
    yearTo,
    toggleGenre,
    setYearFrom,
    setYearTo,
    resetFilters
  } = useSearchFilterStore()

  const yearFromSheetRef = useRef<BottomSheet>(null)
  const yearToSheetRef = useRef<BottomSheet>(null)

  const { open: openYearFrom } = useBottomSheetControl(yearFromSheetRef)
  const { open: openYearTo } = useBottomSheetControl(yearToSheetRef)

  return (
    <BottomSheetWindow
      ref={ref}
      title='Filters'
      // isSubmitButtonDisabled={isSubmitButtonDisabled}
      submitButtonText='Apply'
      snapPoints={['100%']}
      footerDirection='row'
      cancelButtonText='Reset'
      onCancel={resetFilters}
    >
      <ScrollView>
        <View style={[styles.inset]}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <GenreChips
            genres={data?.data ?? []}
            selected={genres}
            onToggle={toggleGenre}
          />

          <Text style={styles.sectionTitle}>Year</Text>
          <View style={styles.yearSelectors}>
            <Button
              label={`From${yearFrom ? ` ${yearFrom}` : ''}`}
              icon={CalendarArrowDown}
              variant='secondary'
              fullWidth
              onPress={openYearFrom}
            />

            <Button
              label={`To${yearTo ? ` ${yearTo}` : ''}`}
              icon={CalendarArrowUp}
              variant='secondary'
              fullWidth
              onPress={openYearTo}
            />
          </View>
        </View>
      </ScrollView>

      <YearSelectorSheet
        label='From'
        value={yearFrom}
        maxYear={yearTo}
        ref={yearFromSheetRef}
        onChange={setYearFrom}
      />

      <YearSelectorSheet
        label='To'
        value={yearTo}
        minYear={yearFrom}
        ref={yearToSheetRef}
        onChange={setYearTo}
      />
    </BottomSheetWindow>
  )
}

const styles = StyleSheet.create({
  inset: {
    paddingTop: LAYOUT['space-vertical'] - 1,
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.muted
  },
  yearSelectors: {
    flexDirection: 'row',
    gap: SPACINGS[1]
  }
})
