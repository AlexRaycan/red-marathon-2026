import { COLORS, FONT_SIZE, RADIUS, SPACINGS } from '@app/tokens'
import hexToRgba from 'hex-to-rgba'
import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View
} from 'react-native'

import { GlassView } from './GlassView'

interface InputProps extends TextInputProps {
  error?: string
}

export function Input({ error, ...props }: InputProps) {
  return (
    <View style={[styles.root]}>
      <GlassView
        isInteractive
        tintColor={error && hexToRgba(COLORS.status.error, 0.15)}
        style={[styles.container]}
      >
        <TextInput
          placeholderTextColor={COLORS.text.muted}
          style={[styles.input]}
          {...props}
        />
      </GlassView>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: SPACINGS[1]
  },
  container: {
    paddingHorizontal: SPACINGS[4],
    borderRadius: RADIUS.md
  },
  input: {
    height: 52,
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.base
  },
  inputFallback: {
    backgroundColor: COLORS.bg.card
  },
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.status.error
  },
  error: {
    color: COLORS.status.error,
    fontSize: FONT_SIZE.sm,
    paddingHorizontal: RADIUS.md
  }
})
