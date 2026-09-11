import { configureApi } from '@app/api'
import * as SecureStore from 'expo-secure-store'

configureApi({
  baseUrl: process.env.EXPO_PUBLIC_API_URL!,
  getToken: async () => SecureStore.getItemAsync('accessToken')
})
