import { COLORS, SPACINGS } from '@app/tokens'
import { router } from 'expo-router'
import { LogIn } from 'lucide-react-native'
import type { ComponentProps } from 'react'
import { StyleSheet, View } from 'react-native'

import { Button } from './Button'

export function LoginToButton({
  label = 'Go to Login',
  tintColor = COLORS.status.success,
  style,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <View style={[styles.unauthenticated, style]}>
      <Button
        label={label}
        icon={LogIn}
        tintColor={tintColor}
        size='lg'
        onPress={() => router.push('/login')}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  unauthenticated: {
    paddingVertical: SPACINGS[4]
  }
})
