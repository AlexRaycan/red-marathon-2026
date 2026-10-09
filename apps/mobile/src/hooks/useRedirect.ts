import { type Href, useLocalSearchParams } from 'expo-router'

export function useRedirect() {
  const { redirect } = useLocalSearchParams<{
    redirect?: Extract<Href, string>
  }>()

  return {
    redirect: redirect
  }
}
