import {
  VerifyPurchaseDtoProvider,
  getMySubscriptionQueryKey,
  useVerifyPurchase
} from '@app/api'
import { useAuth } from '@app/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { ErrorCode, useIAP } from 'expo-iap'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { Alert } from 'react-native'

import {
  PRODUCT_IDS,
  SUBSCRIPTION_PRODUCT_IDS
} from '@/components/screens/subscriptions/subscriptions.data'

import { useProtectedPush } from './useProtectedPush'

export function usePurchaseSubscription() {
  const queryClient = useQueryClient()

  const { isAuthenticated } = useAuth()
  const pushProtected = useProtectedPush()

  const { mutateAsync: verifyPurchase } = useVerifyPurchase()

  const { connected, fetchProducts, requestPurchase, finishTransaction } =
    useIAP({
      onPurchaseSuccess: async purchase => {
        try {
          await verifyPurchase({
            data: {
              provider: VerifyPurchaseDtoProvider.APPLE,
              token: purchase.id
            }
          })

          await finishTransaction({
            purchase,
            isConsumable: false
          })

          await queryClient.invalidateQueries({
            queryKey: getMySubscriptionQueryKey()
          })

          router.back()
        } catch {
          Alert.alert('Payment failed', 'Could not confirm purchase')
        }
      },
      onPurchaseError: error => {
        if (error.code === ErrorCode.UserCancelled) return

        Alert.alert('Payment failed', error.message)
      }
    })

  useEffect(() => {
    if (connected) {
      void fetchProducts({
        skus: PRODUCT_IDS,
        type: 'subs'
      })
    }
  }, [connected, fetchProducts])

  return (subId: string) => {
    if (!isAuthenticated) {
      pushProtected('/subscriptions')

      return
    }

    void requestPurchase({
      request: {
        apple: {
          sku: SUBSCRIPTION_PRODUCT_IDS[subId] ?? ''
        }
      },
      type: 'subs'
    })
  }
}
