import BottomSheet, {
  type BottomSheetProps,
  BottomSheetView
} from '@expo/ui/community/bottom-sheet'
import { type RefObject } from 'react'
import { StyleSheet } from 'react-native'

import { BottomSheetActionButtons } from './BottomSheetActionButtons'
import { ButtonSheetTitle } from './ButtonSheetTitle'

type BottomSheetWindowProps = Omit<BottomSheetProps, 'ref'> & {
  ref?: RefObject<BottomSheet | null>
  title?: string
  isSubmitButtonDisabled?: boolean
  onSubmit?: () => void
}

export function BottomSheetWindow({
  ref,
  children,
  index = -1,
  title,
  isSubmitButtonDisabled,
  onSubmit,
  ...props
}: BottomSheetWindowProps) {
  return (
    <BottomSheet
      ref={ref}
      index={index}
      enablePanDownToClose
      enableDynamicSizing
      {...props}
    >
      <BottomSheetView style={styles.view}>
        {title && <ButtonSheetTitle title={title} />}

        {children}

        <BottomSheetActionButtons
          ref={ref}
          isSubmitButtonDisabled={isSubmitButtonDisabled}
          onSubmit={onSubmit}
        />
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
})
