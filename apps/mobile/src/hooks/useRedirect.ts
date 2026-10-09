import { type Href, router, useLocalSearchParams } from 'expo-router'

export function useRedirect() {
  const { redirect } = useLocalSearchParams<{
    redirect?: Extract<Href, string>
  }>()

  const onRedirect = (fallback?: Extract<Href, string>) => {
    if (redirect) {
      router.dismissTo(redirect)

      return
    }

    router.replace(fallback ?? '/')
  }

  return {
    redirect,
    onRedirect
  }
}
