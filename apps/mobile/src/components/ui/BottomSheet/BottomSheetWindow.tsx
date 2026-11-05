import BottomSheet, {
  type BottomSheetProps,
  BottomSheetView
} from '@expo/ui/community/bottom-sheet'
import { type ReactNode, type RefObject } from 'react'
import { StyleSheet } from 'react-native'

import { ViewLayout } from '../ViewLayout'

import { BottomSheetFooter } from './BottomSheetFooter'
import { BottomSheetTitle } from './BottomSheetTitle'

interface BottomSheetWindowProps extends Omit<BottomSheetProps, 'ref'> {
  ref: RefObject<BottomSheet | null>
  title?: string
  action?: ReactNode
  footerDirection?: 'row' | 'column'
  isSubmitButtonDisabled?: boolean
  hasCancelButton?: boolean
  isFooterHidden?: boolean
  submitButtonText?: string
  cancelButtonText?: string
  onSubmit?: () => void
  onCancel?: () => void
}

export function BottomSheetWindow({
  ref,
  children,
  index = -1,
  title,
  action,
  footerDirection,
  isSubmitButtonDisabled,
  hasCancelButton,
  isFooterHidden,
  submitButtonText,
  cancelButtonText,
  onSubmit,
  onCancel,
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
        {title && (
          <BottomSheetTitle
            title={title}
            action={action}
          />
        )}

        <ViewLayout.Root>{children}</ViewLayout.Root>

        {!isFooterHidden && (
          <BottomSheetFooter
            ref={ref}
            flexDirection={footerDirection}
            isSubmitButtonDisabled={isSubmitButtonDisabled}
            hasCancelButton={hasCancelButton}
            submitButtonText={submitButtonText}
            cancelButtonText={cancelButtonText}
            onSubmit={onSubmit}
            onCancel={onCancel}
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
