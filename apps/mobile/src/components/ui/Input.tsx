import { COLORS, FONT_SIZE, RADIUS, SPACINGS } from '@app/tokens'
import hexToRgba from 'hex-to-rgba'
import { Eye, EyeOff } from 'lucide-react-native'
import { type ReactNode, useState } from 'react'
import {
  type ColorValue,
  type StyleProp,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle
} from 'react-native'

import { GlassView } from './GlassView'
import { Pressable } from './Pressable'

interface InputProps extends TextInputProps {
  tintColor?: ColorValue
  error?: string
  isPassword?: boolean
  elements?: {
    prefix?: ReactNode
    suffix?: ReactNode
  }
  containerStyle?: StyleProp<ViewStyle>
}

export function Input({
  multiline,
  tintColor,
  error,
  isPassword,
  containerStyle,
  elements,
  style,
  ...props
}: InputProps) {
  const [isSecure, setIsSecure] = useState(isPassword)

  return (
    <View style={[styles.root]}>
      <GlassView
        isInteractive
        tintColor={error ? hexToRgba(COLORS.status.error, 0.15) : tintColor}
        style={[
          styles.container,
          multiline && [styles.multilineContainer, styles.multilineHeight],
          containerStyle
        ]}
      >
        {elements?.prefix}

        <TextInput
          placeholderTextColor={COLORS.text.muted}
          secureTextEntry={isPassword && isSecure}
          multiline={multiline}
          style={[styles.input, multiline && styles.multilineHeight, style]}
          {...props}
        />

        {elements?.suffix}

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
    gap: SPACINGS[2],
    alignItems: 'center',
    paddingHorizontal: SPACINGS[4],
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  multilineHeight: {
    minHeight: 110
  },
  multilineContainer: {
    alignItems: 'flex-start',
    height: undefined,
    borderRadius: RADIUS.sm
  },
  input: {
    flex: 1,
    minHeight: 52,
    paddingVertical: SPACINGS[3],
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.base
  },
  error: {
    color: COLORS.status.error,
    fontSize: FONT_SIZE.sm,
    paddingHorizontal: RADIUS.md
  }
})
