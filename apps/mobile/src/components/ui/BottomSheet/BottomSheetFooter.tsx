import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { type RefObject, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import { useBottomSheetControl } from '@/hooks'

import { Button } from '../Button'
import { GlassContainer } from '../GlassContainer'

interface BottomSheetActionButtonsProps {
  ref: RefObject<BottomSheet | null>
  hasCancelButton?: boolean
  isSubmitButtonDisabled?: boolean
  submitButtonText?: string
  cancelButtonText?: string
  flexDirection?: 'row' | 'column'
  onSubmit?: () => void
  onCancel?: () => void
}

export function BottomSheetFooter({
  ref,
  isSubmitButtonDisabled,
  hasCancelButton = true,
  submitButtonText,
  cancelButtonText = 'Cancel',
  flexDirection = 'column',
  onSubmit,
  onCancel
}: BottomSheetActionButtonsProps) {
  const { close } = useBottomSheetControl(ref)

  const handleSubmit = useCallback(() => {
    onSubmit?.()

    close()
  }, [close, onSubmit])

  const handleCancel = useCallback(() => {
    onCancel?.()

    close()
  }, [close, onCancel])

  return (
    <GlassContainer>
      <View
        style={[
          styles.inset,
          styles.buttonsContainer,
          { flexDirection: flexDirection === 'row' ? 'row-reverse' : 'column' }
        ]}
      >
        {(submitButtonText || onSubmit) && (
          <Button
            label={submitButtonText ?? 'Send'}
            tintColor={COLORS.status.success}
            size='lg'
            fullWidth
            disabled={isSubmitButtonDisabled}
            onPress={handleSubmit}
          />
        )}

        {hasCancelButton && (
          <Button
            label={cancelButtonText}
            variant='secondary'
            size='lg'
            fullWidth
            onPress={handleCancel}
          />
        )}
      </View>
    </GlassContainer>
  )
}

const styles = StyleSheet.create({
  inset: {
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  buttonsContainer: {
    gap: SPACINGS[2],
    marginTop: SPACINGS[4]
  }
})
