import { COLORS } from '@app/tokens'
import { Search } from 'lucide-react-native'
import { StyleSheet } from 'react-native'

import { Input } from './Input'

interface SearchFieldProps {
  value: string
  placeholder: string
  onChangeText: (value: string) => void
}

export function SearchField({
  value,
  placeholder,
  onChangeText
}: SearchFieldProps) {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      elements={{
        prefix: (
          <Search
            size={18}
            color={COLORS.text.muted}
          />
        )
      }}
      autoCapitalize='none'
      autoCorrect={false}
      returnKeyType='search'
      clearButtonMode='while-editing'
      accessibilityLabel={placeholder}
      onChangeText={onChangeText}
    />
  )
}

const styles = StyleSheet.create({})
