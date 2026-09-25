import { configureApi } from '@app/api'
import { authTokenSchema } from '@app/schemas'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import { clearTokens, getRefreshToken, saveTokens } from './token'

configureApi({
  baseUrl: process.env.EXPO_PUBLIC_API_URL!,
  getToken: async () => SecureStore.getItemAsync('accessToken'),
  onRefresh: async () => {
    const refreshToken = await getRefreshToken()

    if (!refreshToken) return false

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/mobile/refresh`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken })
        }
      )

      if (!response.ok) return false

      const result = authTokenSchema.safeParse(await response.json())

      if (!result.success) return false

      const { data } = result

      await saveTokens(data.accessToken, data.refreshToken)

      return true
    } catch {
      return false
    }
  },
  onUnauthorized: async () => {
    await clearTokens()
    router.replace('/login')
  }
})
