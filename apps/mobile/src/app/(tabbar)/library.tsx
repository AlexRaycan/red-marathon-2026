import { TYPE_LABELS } from '@app/constants'
import { COLORS, FONT_SIZE, SPACINGS } from '@app/tokens'
import { MEDIA_TYPES } from '@app/types'
import { Link } from 'expo-router'
import { StyleSheet, Text } from 'react-native'

import { Screen } from '@/components/Screen'

export default function LibraryScreen() {
  return (
    <Screen>
      <Text>Library</Text>
      {MEDIA_TYPES.map(type => (
        <Link
          key={type}
          href={`/library/${type}/1`}
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
