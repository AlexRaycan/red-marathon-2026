import { ACCESS_TOKEN, REFRESH_TOKEN } from '@app/constants'
import * as SecureStore from 'expo-secure-store'

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken)
  await SecureStore.setItemAsync(REFRESH_TOKEN, refreshToken)
}

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN)
  await SecureStore.deleteItemAsync(REFRESH_TOKEN)
}

export const getAccessToken = () => SecureStore.getItemAsync(ACCESS_TOKEN)
export const getRefreshToken = () => SecureStore.getItemAsync(REFRESH_TOKEN)
