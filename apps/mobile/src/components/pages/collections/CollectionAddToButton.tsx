import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { Plus } from 'lucide-react-native'
import { useRef } from 'react'

import { Button } from '@/components/ui'

import { useBottomSheetControl } from '@/hooks'

import { CollectionAddToSheet } from './CollectionAddToSheet'

interface CollectionAddToButtonProps {
  titleKey: string
}

export function CollectionAddToButton({
  titleKey
}: CollectionAddToButtonProps) {
  const sheetRef = useRef<BottomSheet>(null)
  const { open } = useBottomSheetControl(sheetRef)

  return (
    <>
      <Button
        icon={Plus}
        onPress={open}
      />
      <CollectionAddToSheet
        titleKey={titleKey}
        ref={sheetRef}
      />
    </>
  )
}
