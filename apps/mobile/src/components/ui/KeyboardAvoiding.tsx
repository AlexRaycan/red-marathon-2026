import { LAYOUT } from '@app/tokens'
import { Platform, type ViewProps } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'

export function KeyboardAvoiding({ children, ...props }: ViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={LAYOUT['space-vertical']}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  )
}
