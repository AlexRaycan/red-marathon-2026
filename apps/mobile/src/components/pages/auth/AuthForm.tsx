import { ApiError } from '@app/api'
import { AUTH_CONTENT } from '@app/constants'
import { type TAuthForm, authSchema } from '@app/schemas'
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import hexToRgba from 'hex-to-rgba'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, StyleSheet, Text } from 'react-native'

import { Button } from '@/components/ui/Button'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { Input } from '@/components/ui/Input'
import { Screen } from '@/components/ui/Screen'
import { ViewLayout } from '@/components/ui/ViewLayout'

interface AuthFormProps {
  type: keyof typeof AUTH_CONTENT
  isPending: boolean
  error: unknown
  onSubmit: (data: TAuthForm) => void
}

export function AuthForm({ type, error, isPending, onSubmit }: AuthFormProps) {
  const content = AUTH_CONTENT[type]

  const { control, handleSubmit } = useForm<TAuthForm>({
    resolver: zodResolver(authSchema)
  })

  return (
    <Screen withPaddings>
      <ViewLayout.Root>
        <ViewLayout.Center style={styles.center}>
          <Text style={styles.title}>{content.title}</Text>

          <GlassContainer style={styles.form}>
            <GlassContainer style={styles.formInputs}>
              <Controller
                control={control}
                name='email'
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <Input
                    placeholder='Enter email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    value={value}
                    error={error?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name='password'
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <Input
                    placeholder='Enter password'
                    isPassword
                    value={value}
                    error={error?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              {error instanceof ApiError && (
                <Text style={styles.error}>{error.message}</Text>
              )}
            </GlassContainer>

            <Button
              size='lg'
              tintColor={hexToRgba(COLORS.status.success, 0.3)}
              label={isPending ? content.pending : content.submit}
              disabled={isPending}
              onPress={handleSubmit(onSubmit)}
            />
          </GlassContainer>
        </ViewLayout.Center>

        <Pressable onPress={() => router.replace(content.footerHref)}>
          <Text style={styles.link}>
            {content.footerText}{' '}
            <Text style={styles.linkAccent}>{content.footerAction}</Text>
          </Text>
        </Pressable>
      </ViewLayout.Root>
    </Screen>
  )
}

const styles = StyleSheet.create({
  center: {
    gap: SPACINGS[10]
  },
  title: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['2xl'],
    fontWeight: FONT_WEIGHT.bold,
    textAlign: 'center'
  },
  form: {
    gap: SPACINGS[4]
  },
  formInputs: {
    gap: SPACINGS[3]
  },
  error: {
    color: COLORS.status.error,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center'
  },
  link: {
    color: COLORS.text.primary,
    textAlign: 'center',
    fontSize: FONT_SIZE.sm
  },
  linkAccent: {
    fontWeight: FONT_WEIGHT.semibold,
    textDecorationLine: 'underline'
  }
})
