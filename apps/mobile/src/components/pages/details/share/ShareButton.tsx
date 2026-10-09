import type { DiscoverDetailsResponse } from '@app/api'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { Share } from 'lucide-react-native'
import { useRef } from 'react'

import { Button } from '@/components/ui'

import { ShareBottomSheet } from '@/components/pages/details'

import { useOpenBottomSheet } from '@/hooks/useOpenBottomSheet'

interface ShareButtonProps {
  title: Pick<
    DiscoverDetailsResponse,
    'type' | 'coverUrl' | 'name' | 'releaseDate'
  >
  isAuthenticated?: boolean
}

export function ShareButton({ title, isAuthenticated }: ShareButtonProps) {
  const shareSheetRef = useRef<BottomSheet>(null)

  const { open } = useOpenBottomSheet(shareSheetRef)

  // TODO: how to save opening state of share sheet when navigating away from the login page

  return (
    <>
      <Button
        icon={Share}
        variant='transparent'
        hapticStyle='success'
        onPress={open}
      />
      <ShareBottomSheet
        title={title}
        ref={shareSheetRef}
        isAuthenticated={isAuthenticated}
      />
    </>
  )
}
