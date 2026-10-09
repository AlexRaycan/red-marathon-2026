import { useAuth } from '@app/hooks'
import { type Href, Link, router } from 'expo-router'

export function useProtectedPush() {
  const { isAuthenticated } = useAuth()

  return (href: Href) => {
    if (isAuthenticated) {
      router.push(href)

      return
    }

    router.push({
      pathname: '/login',
      params: { redirect: Link.resolveHref(href) }
    })
  }
}
