import { COLORS, FONT_SIZE, RADIUS, SPACINGS } from '@app/tokens'
import hexToRgba from 'hex-to-rgba'
import { Eye, EyeOff } from 'lucide-react-native'
import { useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View
} from 'react-native'

import { GlassView } from './GlassView'

interface InputProps extends TextInputProps {
  error?: string
  isPassword?: boolean
}

export function Input({ error, isPassword, ...props }: InputProps) {
  const [isSecure, setIsSecure] = useState(isPassword)

  return (
    <View style={[styles.root]}>
      <GlassView
        isInteractive
        tintColor={error && hexToRgba(COLORS.status.error, 0.15)}
        style={[styles.container]}
      >
        <TextInput
          placeholderTextColor={COLORS.text.muted}
          secureTextEntry={isPassword && isSecure}
          style={[styles.input]}
          {...props}
        />

        {isPassword && (
          <Pressable
            hitSlop={12}
            onPress={() => setIsSecure(v => !v)}
          >
            {isSecure ? (
              <EyeOff
                size={20}
                color={COLORS.text.muted}
              />
            ) : (
              <Eye
                size={20}
                color={COLORS.text.muted}
              />
            )}
          </Pressable>
        )}
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
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    flex: 1,
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
