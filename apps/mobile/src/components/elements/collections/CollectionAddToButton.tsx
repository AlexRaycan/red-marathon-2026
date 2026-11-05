import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { type LucideIcon, Plus } from 'lucide-react-native'
import { useRef } from 'react'

import { Button } from '@/components/ui'

import { CollectionCreateSheet } from '@/components/screens/collections'

import { useBottomSheetControl, useCollection } from '@/hooks'

import { CollectionAddToSheet } from './CollectionAddToSheet'

interface IOptions {
  icon?: LucideIcon
  lable?: string
  fullWidth?: boolean
}

interface CollectionAddToButtonProps {
  titleKey: string
  options?: IOptions
}

export function CollectionAddToButton({
  titleKey,
  options
}: CollectionAddToButtonProps) {
  const sheetRef = useRef<BottomSheet>(null)
  const { open } = useBottomSheetControl(sheetRef)

  const { icon: Icon = Plus, lable, fullWidth } = options ?? {}

  const { collections } = useCollection(titleKey)

  return (
    <>
      <Button
        icon={Icon}
        {...(lable && { label: lable })}
        {...(fullWidth && { fullWidth: fullWidth })}
        variant='secondary'
        onPress={open}
      />

      {collections.length > 0 ? (
        <CollectionAddToSheet
          titleKey={titleKey}
          ref={sheetRef}
        />
      ) : (
        <CollectionCreateSheet ref={sheetRef} />
      )}
    </>
  )
}
