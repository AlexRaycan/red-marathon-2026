import { TYPE_LABELS } from '@app/constants'
import { MEDIA_TYPES } from '@app/types'
import { Link } from 'expo-router'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LibraryScreen() {
  return (
    <SafeAreaView>
      <Text>Library</Text>
      {MEDIA_TYPES.map(type => (
        <Link
          key={type}
          href={`/library/${type}/1`}
        >
          {TYPE_LABELS[type]}
        </Link>
      ))}
    </SafeAreaView>
  )
}
