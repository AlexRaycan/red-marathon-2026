import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { type RefObject, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import { Button } from '@/components/ui/Button'
import { GlassContainer } from '@/components/ui/GlassContainer'

import { useBottomSheetControl } from '@/hooks'

interface BottomSheetActionButtonsProps {
  ref: RefObject<BottomSheet | null>
  isSubmitButtonDisabled?: boolean
  submitButtonText?: string
  cancelButtonText?: string
  onSubmit?: () => void
  onCancel?: () => void
}

export function BottomSheetFooter({
  ref,
  isSubmitButtonDisabled,
  submitButtonText = 'Send',
  cancelButtonText = 'Cancel',
  onSubmit,
  onCancel
}: BottomSheetActionButtonsProps) {
  const { close } = useBottomSheetControl(ref)

  const handleSubmit = useCallback(() => {
    onSubmit?.()
  }, [onSubmit])

  const handleCancel = useCallback(() => {
    onCancel?.()

    close()
  }, [close, onCancel])

  return (
    <GlassContainer>
      <View style={[styles.inset, styles.buttonsContainer]}>
        <Button
          label={submitButtonText}
          tintColor={COLORS.status.success}
          size='lg'
          disabled={isSubmitButtonDisabled}
          onPress={handleSubmit}
        />
        <Button
          label={cancelButtonText}
          variant='secondary'
          size='lg'
          onPress={handleCancel}
        />
      </View>
    </GlassContainer>
  )
}

const styles = StyleSheet.create({
  inset: {
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: SPACINGS[2],
    marginTop: SPACINGS[4]
  }
})
