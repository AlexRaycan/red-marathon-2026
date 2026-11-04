import BottomSheet, {
  type BottomSheetProps,
  BottomSheetView
} from '@expo/ui/community/bottom-sheet'
import { type ReactNode, type RefObject } from 'react'
import { StyleSheet } from 'react-native'

import { BottomSheetFooter } from './BottomSheetFooter'
import { BottomSheetTitle } from './BottomSheetTitle'

interface BottomSheetWindowProps extends Omit<BottomSheetProps, 'ref'> {
  ref: RefObject<BottomSheet | null>
  title?: string
  action?: ReactNode
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
  action,
  isSubmitButtonDisabled,
  isFooterHidden,
  submitButtonText,
  cancelButtonText,
  onSubmit,
  ...props
}: BottomSheetWindowProps) {
  // FIXME: поправить баги с тем, что при первом открытии footer оказывается за пределами экрана
  // но если нажать на поле ввода текста, а потом убрать фокус, то нормально
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
