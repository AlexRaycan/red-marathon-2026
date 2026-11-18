import { SPACINGS } from '@app/tokens'
import { Platform } from 'react-native'
import {
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
  KeyboardToolbar
} from 'react-native-keyboard-controller'

import { Blur } from './Blur'

function KeyboardAvoidingContainer({
  children,
  ...props
}: KeyboardAvoidingViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={SPACINGS[3] + SPACINGS[10] + SPACINGS[3]}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  )
}

function KeyboardAvoidingToolbar({
  children,
  ...props
}: KeyboardAvoidingViewProps) {
  return (
    <KeyboardToolbar
      opacity='4D'
      {...props}
    >
      <KeyboardToolbar.Background>
        <Blur />
      </KeyboardToolbar.Background>

      <KeyboardToolbar.Prev />
      <KeyboardToolbar.Next />
      <KeyboardToolbar.Done />
    </KeyboardToolbar>
  )
}

export const KeyboardAvoiding = {
  View: KeyboardAvoidingContainer,
  Toolbar: KeyboardAvoidingToolbar
}
