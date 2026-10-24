import { SPACINGS } from '@app/tokens'
import { ScrollView, StyleSheet } from 'react-native'

import { Chip, GlassContainer } from '@/components/ui'

import type { IChipOption } from './chip-filter.types'

interface ChipFilterProps<T extends string> {
  options: IChipOption<T>[]
  value: T | null
  onChange: (value: T | null) => void
}

export function ChipFilter<T extends string>({
  options,
  value,
  onChange
}: ChipFilterProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={styles.content}
    >
      <GlassContainer style={styles.content}>
        {options.map(
          ({ value: optionValue, label, icon: Icon, isFilledIcon, count }) => {
            const isActive = optionValue === value

            return (
              <Chip
                key={optionValue ?? 'ALL'}
                label={label}
                icon={Icon}
                count={count}
                isActive={isActive}
                withFillIcon={isActive && isFilledIcon}
                onPress={() => onChange(optionValue)}
              />
            )
          }
        )}
      </GlassContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 0,
    overflow: 'visible',
    marginBottom: SPACINGS[4]
  },
  content: {
    flexDirection: 'row',
    gap: SPACINGS[2]
  }
})
