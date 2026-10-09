import { useAuthMobileLogin } from '@app/api'
import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'

import { AuthForm } from '@/components/pages/auth'

import { saveTokens } from '@/lib/token'

import { useRedirect } from '@/hooks'

export default function Login() {
  const queryClient = useQueryClient()
  const { redirect } = useRedirect()

  const { mutate, isPending, error } = useAuthMobileLogin({
    mutation: {
      onSuccess: async ({ data: { accessToken, refreshToken } }) => {
        await saveTokens(accessToken, refreshToken)
        queryClient.clear()

        if (redirect) {
          router.replace(redirect)

          return
        }

        router.replace('/')
      }
    }
  })

  return (
    <AuthForm
      type='login'
      error={error}
      isPending={isPending}
      onSubmit={data => mutate({ date: data })}
    />
  )
}
