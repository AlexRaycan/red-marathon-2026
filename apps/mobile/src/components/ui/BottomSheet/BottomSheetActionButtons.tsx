import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { type RefObject, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import { Button } from '@/components/ui/Button'
import { GlassContainer } from '@/components/ui/GlassContainer'

interface BottomSheetActionButtonsProps {
  ref?: RefObject<BottomSheet | null>
  isSubmitButtonDisabled?: boolean
  onSubmit?: () => void
  onCancel?: () => void
}

export function BottomSheetActionButtons({
  ref,
  isSubmitButtonDisabled,
  onSubmit,
  onCancel
}: BottomSheetActionButtonsProps) {
  const closeSheet = useCallback(() => {
    ref?.current?.dismiss()
  }, [ref])

  const handleSubmit = useCallback(() => {
    onSubmit?.()

    closeSheet()
  }, [closeSheet, onSubmit])

  const handleCancel = useCallback(() => {
    onCancel?.()

    closeSheet()
  }, [closeSheet, onCancel])

  return (
    <GlassContainer>
      <View style={[styles.inset, styles.buttonsContainer]}>
        <Button
          label='Send'
          tintColor={COLORS.status.success}
          size='lg'
          disabled={isSubmitButtonDisabled}
          onPress={handleSubmit}
        />
        <Button
          label='Cancel'
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
