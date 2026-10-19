import { useCurrentUser } from '@app/api'

export function useAuth() {
  const { data: me, isLoading, isError } = useCurrentUser()
  const isAuthenticated = me?.status === 200

  return {
    isAuthenticated,
    user: me?.data ?? null,
    isLoading,
    isError
  }
}
