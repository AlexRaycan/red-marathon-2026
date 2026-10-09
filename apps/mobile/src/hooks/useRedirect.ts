import { type Href, router, useLocalSearchParams } from 'expo-router'

export function useRedirect() {
  const { redirect } = useLocalSearchParams<{
    redirect?: Extract<Href, string>
  }>()

  const onRedirect = (pathname?: Extract<Href, string>) => {
    if (redirect) {
      router.replace(redirect)

      return
    }

    router.replace(pathname ?? '/')
  }

  return {
    redirect,
    onRedirect
  }
}
