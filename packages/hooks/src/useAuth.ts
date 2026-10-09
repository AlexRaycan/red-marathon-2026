import { useUserFindMe } from '@app/api'

export function useAuth() {
  const { data: me } = useUserFindMe()
  const isAuthenticated = me?.status === 200

  return {
    isAuthenticated,
    user: me?.data ?? null
  }
}
