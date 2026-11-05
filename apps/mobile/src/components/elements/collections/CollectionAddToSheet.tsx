import { COLORS, FONT_SIZE, LAYOUT } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { type RefObject } from 'react'
import { StyleSheet, Text } from 'react-native'

import { BottomSheetWindow, ViewLayout } from '@/components/ui'

import {
  CollectionCreateButton,
  CollectionRow
} from '@/components/screens/collections'

import { useBottomSheetControl, useCollection } from '@/hooks'

interface CollectionAddToSheetProps {
  titleKey: string
  ref: RefObject<BottomSheet | null>
}

export function CollectionAddToSheet({
  titleKey,
  ref
}: CollectionAddToSheetProps) {
  const { collections, collectionIds, toggle } = useCollection(titleKey)
  const hasCollections = collections.length > 0

  const { close } = useBottomSheetControl(ref)

  return (
    <BottomSheetWindow
      ref={ref}
      title='Add to Collection'
      action={<CollectionCreateButton />}
      submitButtonText='Add'
      isSubmitButtonDisabled={!collectionIds.length}
      cancelButtonText='Close'
      onClose={close}
    >
      <ViewLayout.Root style={styles.inset}>
        {hasCollections ? (
          collections.map(collection => (
            <CollectionRow
              key={collection.id}
              collection={collection}
              isSelected={collectionIds.includes(collection.id)}
              onPress={() => toggle(collection.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Create your first collection</Text>
        )}
      </ViewLayout.Root>
    </BottomSheetWindow>
  )
}

const styles = StyleSheet.create({
  inset: {
    paddingTop: LAYOUT['space-vertical'],
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.sm
  }
})
