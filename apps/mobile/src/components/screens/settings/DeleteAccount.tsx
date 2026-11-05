import { useDeleteAccount } from '@app/api'
import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { Alert, Text } from 'react-native'

import { Link } from '@/components/ui'

import { clearTokens } from '@/lib'

import { useOnboardingStore } from '@/store'

export function DeleteAccount() {
  const queryClient = useQueryClient()
  const resetOnboarding = useOnboardingStore(state => state.resetOnboarding)

  const { mutate, isPending } = useDeleteAccount({
    mutation: {
      onSuccess: async () => {
        await clearTokens()
        await queryClient.resetQueries()

        await resetOnboarding()
        router.dismissTo('/onboarding')
      }
    }
  })

  const onDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Your library, reviews and collections will be permanently deleted. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => mutate()
        }
      ]
    )
  }

  return (
    <Link.Button
      isDestructive
      onPress={onDeleteAccount}
    >
      <Text>{isPending ? 'Deleting...' : 'Delete account'}</Text>
    </Link.Button>
  )
}
