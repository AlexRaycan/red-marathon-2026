import {
  getMyCollectionsQueryKey,
  useCollectionById,
  useDeleteCollection
} from '@app/api'
import { EMPTY_TEXT } from '@app/constants'
import { COLORS } from '@app/tokens'
import { useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import hexToRgba from 'hex-to-rgba'
import { Trash2 } from 'lucide-react-native'
import { Alert, StyleSheet } from 'react-native'

import { Button, Screen } from '@/components/ui'

import { TitlesGrid, Toolbar } from '@/components/elements'

import { useScrollAnimation } from '@/hooks'

export default function CollectionDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const queryClient = useQueryClient()
  const { scrollY, scrollHandler } = useScrollAnimation()

  const { data, isPending } = useCollectionById(id)
  const collection = data?.status === 200 ? data.data : null

  const { mutate: deleteCollection } = useDeleteCollection({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: getMyCollectionsQueryKey()
        })
        router.back()
      }
    }
  })

  if (isPending) return <Screen />

  if (!collection) {
    router.back()

    return <Screen />
  }

  const { name, titles } = collection

  const onDelete = () => {
    Alert.alert('Delete collection?', 'Titles stay in your library.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteCollection({ id })
      }
    ])
  }

  const texts = EMPTY_TEXT.collection
  const emptyText = isPending ? undefined : texts.default

  return (
    <Screen>
      <Toolbar
        leftSide={name}
        rightSide={
          <Button
            icon={Trash2}
            contentColor={COLORS.status.error}
            tintColor={hexToRgba(COLORS.status.error, 0.35)}
            accessibilityLabel='Delete collection'
            onPress={onDelete}
          />
        }
        withGradient
        isBackButton
        scrollY={scrollY}
      />

      <TitlesGrid
        titles={titles}
        getTitle={title => title}
        keyExtractor={title => title.id}
        options={{
          isPending,
          emptyText
        }}
        onScroll={scrollHandler}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})
