import { COLORS, FONT_SIZE, LAYOUT } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { type RefObject } from 'react'
import { StyleSheet, Text } from 'react-native'

import { BottomSheetWindow } from '@/components/ui'

import { useBottomSheetControl, useCollection } from '@/hooks'

import { CollectionCreateButton } from './CollectionCreateButton'
import { CollectionRow } from './CollectionRow'

interface CollectionAddToSheetProps {
  titleKey: string
  ref: RefObject<BottomSheet | null>
}

export function CollectionAddToSheet({
  titleKey,
  ref
}: CollectionAddToSheetProps) {
  const { collections, collectionIds, toggle } = useCollection(titleKey)
  const hasSelectedCollections = collectionIds.length > 0

  const { close } = useBottomSheetControl(ref)

  return (
    <BottomSheetWindow
      ref={ref}
      title='Add to Collection'
      action={!hasSelectedCollections && <CollectionCreateButton />}
      submitButtonText='Add'
      isSubmitButtonDisabled={!collectionIds.length}
      onSubmit={() => console.log('Add to Collection')}
      onClose={close}
    >
      {collections.map(collection => (
        <CollectionRow
          key={collection.id}
          collection={collection}
          isSelected={collectionIds.includes(collection.id)}
          onPress={() => {
            console.log(
              'Press collection:',
              collection,
              collectionIds,
              collectionIds.includes(collection.id)
            )
            toggle(collection.id)
          }}
        />
      ))}

      {!collections.length && (
        <Text style={[styles.inset, styles.emptyText]}>
          Create your first collection
        </Text>
      )}
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
