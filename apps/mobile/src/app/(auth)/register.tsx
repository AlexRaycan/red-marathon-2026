import { useAuthMobileRegister } from '@app/api'
import { type TAuthForm, authSchema } from '@app/schemas'
import { LAYOUT, SPACINGS } from '@app/tokens'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, useWindowDimensions } from 'react-native'

import { Button } from '@/components/ui/Button'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { Input } from '@/components/ui/Input'
import { Screen } from '@/components/ui/Screen'

import { saveTokens } from '@/lib/token'

export default function Register() {
  const { width } = useWindowDimensions()

  const { control, handleSubmit, getValues } = useForm<TAuthForm>({
    resolver: zodResolver(authSchema)
  })

  const { email, password } = getValues()

  const { mutate, isPending } = useAuthMobileRegister({
    mutation: {
      onSuccess: async ({ data: { accessToken, refreshToken } }) => {
        await saveTokens(accessToken, refreshToken)
        router.replace('/')
      }
    }
  })

  const onSubmit = (data: TAuthForm) => {
    mutate({ data })
  }

  return (
    <Screen style={styles.root}>
      <GlassContainer style={[styles.root, styles.container]}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              placeholder='Enter email'
              autoCapitalize='none'
              keyboardType='email-address'
              value={value}
              error={error?.message}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              placeholder='Enter password'
              secureTextEntry
              value={value}
              error={error?.message}
              onChange={onChange}
            />
          )}
        />

        <Button
          label={isPending ? 'Creating...' : 'Create New Account'}
          disabled={isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </GlassContainer>
    </Screen>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  container: {
    flex: 1,
    gap: SPACINGS[3]
  }
})
