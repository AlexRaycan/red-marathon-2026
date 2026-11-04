import { useMyCollections } from '@app/api'
import { EMPTY_TEXT } from '@app/constants'
import { FONT_SIZE, SPACINGS } from '@app/tokens'
import { getCardWidth } from '@app/utils'
import { useWindowDimensions } from 'react-native'

import { Grid, Screen } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import {
  CollectionCard,
  CollectionCreateButton
} from '@/components/pages/collections'

import { useSpaces } from '@/hooks'

const COLUMNS = 2
const GAP = SPACINGS[4]

export default function CollectionsPage() {
  const { width: windowWidth } = useWindowDimensions()
  const cardWidth = getCardWidth(windowWidth, COLUMNS)

  const { toolbarSpace } = useSpaces()

  const { data, isPending } = useMyCollections()

  const collections = data?.status === 200 ? data.data.items : []

  const texts = EMPTY_TEXT.collections
  const emptyText = isPending ? undefined : texts.default

  return (
    <Screen>
      <Toolbar
        leftSide='Collections'
        rightSide={<CollectionCreateButton />}
        withGradient
        titleSize={FONT_SIZE['3xl']}
        isBackButton
      />

      <Grid
        data={collections}
        keyExtractor={collection => collection.id}
        renderItem={({ item }) => (
          <CollectionCard
            width={cardWidth}
            collection={item}
          />
        )}
        options={{
          columns: COLUMNS,
          spacings: {
            colGap: GAP,
            rowGap: GAP,
            padding: GAP
          },
          isPending,
          emptyText
        }}
        contentContainerStyle={{ paddingTop: toolbarSpace }}
      />
    </Screen>
  )
}
