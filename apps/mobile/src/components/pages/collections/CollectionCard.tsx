import type { CollectionListItemResponse } from '@app/api'
import { StyleSheet, View } from 'react-native'

import { Card } from '@/components/ui'

interface CollectionCardProps {
  collection: CollectionListItemResponse
  width: number
}

export function CollectionCard({ collection, width }: CollectionCardProps) {
  const { id, name, titlesCount, previewCovers } = collection
  const [mainCover, middleCover, backCover] = previewCovers

  return (
    <View>
      <Card
        label={`${name} (${titlesCount})`}
        sourceImage={mainCover ?? null}
        cardWidth={width}

        // onPress={onPress}
      />

      <Card
        sourceImage={middleCover ?? null}
        cardWidth={width}
      />

      <Card
        sourceImage={backCover ?? null}
        cardWidth={width}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
