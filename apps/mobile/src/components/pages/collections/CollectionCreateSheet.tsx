import {
  getApiErrorMessage,
  getMyCollectionsQueryKey,
  useCreateCollection
} from '@app/api'
import { LAYOUT } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { useQueryClient } from '@tanstack/react-query'
import { type RefObject, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { BottomSheetWindow, Input } from '@/components/ui'

import { useBottomSheetControl } from '@/hooks'

interface CollectionCreateSheetProps {
  ref: RefObject<BottomSheet | null>
}

export function CollectionCreateSheet({ ref }: CollectionCreateSheetProps) {
  const queryClient = useQueryClient()
  const [name, setName] = useState('')

  const { close } = useBottomSheetControl(ref)

  const { mutate, isPending, error } = useCreateCollection({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: getMyCollectionsQueryKey()
        })

        close()
      }
    }
  })

  const trimmedName = name.trim()
  const isSubmitButtonDisabled = !trimmedName || isPending

  const handleCreate = () => mutate({ data: { name: trimmedName } })

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
