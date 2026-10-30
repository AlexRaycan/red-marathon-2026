import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { Plus } from 'lucide-react-native'
import { useRef } from 'react'

import { Button } from '@/components/ui'

import { useBottomSheetControl } from '@/hooks'

import { CollectionCreateSheet } from './CollectionCreateSheet'

interface CollectionCreateButtonProps {}

export function CollectionCreateButton({}: CollectionCreateButtonProps) {
  const sheetRef = useRef<BottomSheet>(null)
  const { open } = useBottomSheetControl(sheetRef)

  return (
    <>
      <Button
        icon={Plus}
        onPress={open}
      />
      <CollectionCreateSheet ref={sheetRef} />
    </>
  )
}
