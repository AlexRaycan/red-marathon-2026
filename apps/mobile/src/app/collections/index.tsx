import { useMyCollections } from '@app/api'
import { EMPTY_TEXT } from '@app/constants'
import { FONT_SIZE, SPACINGS } from '@app/tokens'

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
        renderItem={({ item, cardWidth }) => (
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
          emptyText,
          topPaddingOffset: SPACINGS[3]
        }}
      />
    </Screen>
  )
}
