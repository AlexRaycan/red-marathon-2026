import type { GenreSlug } from '@app/api'
import { COLORS, SPACINGS } from '@app/tokens'
import { StyleSheet, View } from 'react-native'

import { Button } from '@/components/ui'

interface IGenres {
  slug: GenreSlug
  label: string
}

interface GenreChipsProps {
  genres: IGenres[]
  selected: GenreSlug[]
  onToggle: (genre: GenreSlug) => void
}

export function GenreChips({ genres, selected, onToggle }: GenreChipsProps) {
  return (
    <View style={styles.root}>
      {genres.map(({ slug, label }) => {
        const isSelected = selected.includes(slug)

        return (
          <Button
            key={slug}
            label={label}
            variant='secondary'
            {...(isSelected && {
              tintColor: COLORS.status.success
            })}
            accessibilityRole='checkbox'
            accessibilityState={{ checked: isSelected }}
            onPress={() => onToggle(slug)}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACINGS[2]
  }
})
