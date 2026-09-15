import { TYPE_LABELS } from '@app/constants'
import { COLORS, FONT_SIZE, SPACINGS } from '@app/tokens'
import { MEDIA_TYPES } from '@app/types'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Toolbar } from '@/components/ui/Toolbar'

export default function LibraryScreen() {
  return (
    <Screen>
      <Toolbar leftSide='Library' />

      {MEDIA_TYPES.map(type => (
        <Link
          key={type}
          href={`/title/${type}/1`}
          style={styles.item}
        >
          {TYPE_LABELS[type]}
        </Link>
      ))}
    </Screen>
  )
}

const styles = StyleSheet.create({
  item: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.base,
    paddingVertical: SPACINGS[3]
  }
})
