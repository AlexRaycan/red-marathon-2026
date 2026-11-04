import { useCollectionById } from '@app/api'
import { EMPTY_TEXT } from '@app/constants'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'

import { Screen } from '@/components/ui'

import { TitlesGrid, Toolbar } from '@/components/elements'

import { useScrollAnimation } from '@/hooks'

export default function CollectionDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { scrollY, scrollHandler } = useScrollAnimation()

  const { data, isPending } = useCollectionById(id)

  const onEndReached = () => {
    /* if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage()
    } */
  }

  const collection = data?.status === 200 ? data.data : null

  if (isPending || !collection) return <Screen />

  const { name, titles } = collection

  const texts = EMPTY_TEXT.collection
  const emptyText = isPending ? undefined : texts.default

  return (
    <Screen>
      <Toolbar
        leftSide={name}
        withGradient
        isBackButton
      />

      <TitlesGrid
        titles={titles}
        getTitle={title => title}
        keyExtractor={title => title.id}
        options={{
          isPending,
          emptyText
        }}
        onEndReached={onEndReached}
        onScroll={scrollHandler}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})
