import BottomSheet, {
  type BottomSheetProps,
  BottomSheetView
} from '@expo/ui/community/bottom-sheet'
import { type RefObject } from 'react'
import { StyleSheet } from 'react-native'

import { BottomSheetFooter } from './BottomSheetFooter'
import { ButtonSheetTitle } from './ButtonSheetTitle'

interface BottomSheetWindowProps extends Omit<BottomSheetProps, 'ref'> {
  ref?: RefObject<BottomSheet | null>
  title?: string
  isSubmitButtonDisabled?: boolean
  isFooterHidden?: boolean
  submitButtonText?: string
  cancelButtonText?: string
  onSubmit?: () => void
}

export function BottomSheetWindow({
  ref,
  children,
  index = -1,
  title,
  isSubmitButtonDisabled,
  isFooterHidden,
  submitButtonText,
  cancelButtonText,
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

        {!isFooterHidden && (
          <BottomSheetFooter
            ref={ref}
            isSubmitButtonDisabled={isSubmitButtonDisabled}
            onSubmit={onSubmit}
            submitButtonText={submitButtonText}
            cancelButtonText={cancelButtonText}
          />
        )}
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
})
