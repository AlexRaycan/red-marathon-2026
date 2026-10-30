import { FONT_SIZE } from '@app/tokens'
import { StyleSheet, View } from 'react-native'

import { Screen, ViewLayout } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import {
  CollectionCard,
  CollectionCreateButton
} from '@/components/pages/collections'

const COLLECTION = {
  id: 'test-collection',
  name: 'Collection 1',
  description: null,
  coverUrl:
    'https://m.media-amazon.com/images/M/MV5BZGEzMzUyYjEtNTE0Yi00NjVlLWFiZTUtYzNiZjIyNWE2Y2I0XkEyXkFqcGc@._V1_FMjpg_UY2048_.jpg',
  previewCovers: [
    'https://m.media-amazon.com/images/M/MV5BZDg2YjNjMTktNzA0My00ZDcyLWI0OGItZmRiZGJiYzNmZTU1XkEyXkFqcGc@._V1_FMjpg_UY2048_.jpg',
    'https://m.media-amazon.com/images/M/MV5BYTgwNGE3MWUtYjkwOS00MjNjLTk1NmUtYWY4MTA3NDE5M2ZiXkEyXkFqcGc@._V1_FMjpg_UX1200_.jpg',
    'https://m.media-amazon.com/images/M/MV5BYjg2YjFkNmMtZjBiYi00MmE5LTkxNjUtOTE4Mjc0NDYzOTBmXkEyXkFqcGc@._V1_FMjpg_UY2048_.jpg'
  ]
}

export default function CollectionsPage() {
  return (
    <Screen>
      <Toolbar
        leftSide='Collections'
        withGradient
        titleSize={FONT_SIZE['3xl']}
        isBackButton
      />

      <ViewLayout.Root style={{ paddingTop: 400 }}>
        <CollectionCard
          width={200}
          collection={COLLECTION}
        />
        <View>
          <CollectionCreateButton />
        </View>
      </ViewLayout.Root>
    </Screen>
  )
}

const styles = StyleSheet.create({})
