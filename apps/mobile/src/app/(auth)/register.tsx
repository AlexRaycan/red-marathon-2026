import { useAuthMobileRegister } from '@app/api'
import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'

import { AuthForm } from '@/components/pages/auth'

import { saveTokens } from '@/lib/token'

export default function Register() {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useAuthMobileRegister({
    mutation: {
      onSuccess: async ({ data: { accessToken, refreshToken } }) => {
        await saveTokens(accessToken, refreshToken)
        queryClient.clear()
        router.replace('/')
      }
    }
  })

  return (
    <AuthForm
      type='register'
      error={error}
      isPending={isPending}
      onSubmit={data => mutate({ data })}
    />
  )
}
