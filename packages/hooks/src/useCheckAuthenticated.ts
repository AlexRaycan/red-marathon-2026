import { useUserFindMe } from '@app/api'

export function useCheckAuthenticated() {
  const { data: me } = useUserFindMe()
  const isAuthenticated = me?.status === 200

  return {
    isAuthenticated
  }
}
