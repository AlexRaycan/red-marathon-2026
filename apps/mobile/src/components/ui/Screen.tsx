import { COLORS, LAYOUT } from '@app/tokens'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { KeyboardController } from 'react-native-keyboard-controller'
import {
  SafeAreaView,
  type SafeAreaViewProps,
  useSafeAreaInsets
} from 'react-native-safe-area-context'

interface Props extends SafeAreaViewProps {
  hasBGColor?: boolean
  withPaddings?: boolean
  dismissKeyboardOnPress?: boolean
}

export function Screen({
  edges = [],
  hasBGColor = true,
  withPaddings,
  dismissKeyboardOnPress = false,
  style,
  children,
  ...props
}: Props) {
  const insets = useSafeAreaInsets()

  const screen = (
    <SafeAreaView
      {...props}
      edges={edges}
      style={[
        styles.root,
        { marginTop: -insets.top },
        hasBGColor && {
          backgroundColor: COLORS.bg.base
        },
        withPaddings && {
          paddingHorizontal: LAYOUT['space-horizontal']
        },
        style
      ]}
    >
      {children}

      {/*{__DEV__ && <TokenDebug />}*/}
    </SafeAreaView>
  )

  if (!dismissKeyboardOnPress) return screen

  return (
    <TouchableWithoutFeedback
      accessible={false}
      onPress={() => {
        if (dismissKeyboardOnPress) void KeyboardController.dismiss()
      }}
    >
      {screen}
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative'
  }
})
