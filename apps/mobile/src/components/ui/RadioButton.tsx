import { COLORS, RADIUS, SPACINGS } from '@app/tokens'
import hexToRgba from 'hex-to-rgba'
import { type ColorValue, StyleSheet, View } from 'react-native'

interface RadioButtonProps {
  isSelected: boolean
  size?: number
  activeColor?: ColorValue
  idleColor?: ColorValue
  innerPaddings?: number
  borderWidth?: number
}

const FALLBACK_VALUES = {
  size: 24,
  activeColor: COLORS.status.success,
  idleColor: hexToRgba(COLORS.text.primary, 0.45),
  innerPaddings: SPACINGS['0.5'],
  borderWidth: 1
}

export function RadioButton({
  isSelected,
  size = FALLBACK_VALUES.size,
  activeColor = FALLBACK_VALUES.activeColor,
  idleColor = FALLBACK_VALUES.idleColor,
  innerPaddings = FALLBACK_VALUES.innerPaddings,
  borderWidth = FALLBACK_VALUES.borderWidth
}: RadioButtonProps) {
  return (
    <View
      style={[
        styles.radioButton,
        {
          width: size,
          height: size,
          padding: innerPaddings,
          borderColor: isSelected ? activeColor : idleColor,
          borderWidth
        }
      ]}
    >
      {isSelected && (
        <View
          style={[styles.radioButtonFill, { backgroundColor: activeColor }]}
        />
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  radioButton: {
    overflow: 'hidden',
    borderRadius: RADIUS.full
  },
  radioButtonFill: {
    flex: 1,
    borderRadius: RADIUS.full
  }
})
