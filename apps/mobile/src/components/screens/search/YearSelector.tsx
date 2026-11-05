import { YEARS } from '@app/constants'
import { SPACINGS } from '@app/tokens'
import { Column, Host, Picker } from '@expo/ui'
import { StyleSheet } from 'react-native'

interface YearSelectorProps {
  label: string
  value: number | null
  minYear?: number | null
  maxYear?: number | null
  onChange: (year: number | null) => void
}

export function YearSelector({
  label,
  value,
  minYear,
  maxYear,
  onChange
}: YearSelectorProps) {
  const years = YEARS.filter(
    year => (!minYear || year >= minYear) && (!maxYear || year <= maxYear)
  )

  return (
    <Host
      matchContents={{ vertical: true }}
      style={styles.host}
    >
      <Column spacing={SPACINGS[2]}>
        <Picker
          selectedValue={value ?? '__none__'}
          onValueChange={val => onChange(val === '__none__' ? null : val)}
          appearance='wheel'
        >
          <Picker.Item
            label={label ?? 'Any'}
            value={'__none__'}
          />
          {years.map(year => (
            <Picker.Item
              key={year}
              label={String(year)}
              value={year}
            />
          ))}
        </Picker>
      </Column>
    </Host>
  )
}

const styles = StyleSheet.create({
  host: {
    flex: 1
  }
})
