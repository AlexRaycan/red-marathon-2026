import { getApiErrorMessage } from '@app/api'
import { LAYOUT } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { type RefObject } from 'react'
import { StyleSheet, View } from 'react-native'

import { BottomSheetWindow, Input } from '@/components/ui'

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

  const { close } = useBottomSheetControl(ref)

  return (
    <BottomSheetWindow
      ref={ref}
      title='New Collection'
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      submitButtonText='Create'
      onSubmit={handleCreate}
      onClose={close}
    >
      <View style={[styles.inset]}>
        <Input
          value={name}
          placeholder='Collection name'
          autoFocus
          error={getApiErrorMessage(error) ?? undefined}
          tintColor={'rgba(255, 255, 255, 0.08)'}
          onChangeText={setName}
        />
      </View>
    </BottomSheetWindow>
  )
}

const styles = StyleSheet.create({
  inset: {
    paddingTop: LAYOUT['space-vertical'],
    paddingHorizontal: LAYOUT['space-horizontal']
  }
})
