import { useAuthMobileLogin, useAuthMobileRegister } from '@app/api'
import type { AUTH_CONTENT } from '@app/constants'
import { useQueryClient } from '@tanstack/react-query'

import { saveTokens } from '@/lib/token'

import { useRedirect } from './useRedirect'

export function useSigning(type: keyof typeof AUTH_CONTENT) {
  const queryClient = useQueryClient()
  const { onRedirect } = useRedirect()

  const hookAuth = type === 'login' ? useAuthMobileLogin : useAuthMobileRegister

  const { mutate, isPending, error } = hookAuth({
    mutation: {
      onSuccess: async ({ data: { accessToken, refreshToken } }) => {
        await queryClient.cancelQueries()

        await saveTokens(accessToken, refreshToken)

        // queryClient.clear() // CLear cache
        await queryClient.resetQueries() // Cancel queries

        onRedirect()
      }
    }
  })

  return { mutate, isPending, error }
}
