import { TYPE_LABELS } from '@app/constants'
import { MEDIA_TYPES } from '@app/types'
import { Download, Play, Plus } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/Button'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RED Marathon</Text>

      <Button icon={Play}>Watch</Button>
      <Button
        variant='secondary'
        icon={Download}
      >
        Download
      </Button>
      <Button
        variant='secondary'
        icon={Plus}
      />

      {MEDIA_TYPES.map(type => (
        <Text
          key={type}
          style={styles.item}
        >
          {TYPE_LABELS[type]}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  title: {
    color: '#f6f6f6',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  item: {
    color: '#A1A1AA',
    fontSize: 16,
    paddingVertical: 4
  }
})
