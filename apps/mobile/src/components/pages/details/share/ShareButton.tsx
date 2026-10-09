import type { DiscoverDetailsResponse } from '@app/api'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { Share } from 'lucide-react-native'
import { useCallback, useRef } from 'react'

import { Button } from '@/components/ui'

import { ShareBottomSheet } from '@/components/pages/details'

import { useBottomSheetAction } from '@/hooks/useBottomSheetAction'

import { BOTTOM_SHEET_ACTIONS } from '@/constants'
import { useBottomSheetControl, useProtectedPush } from '@/hooks'

interface ShareButtonProps {
  title: Pick<
    DiscoverDetailsResponse,
    'type' | 'coverUrl' | 'name' | 'releaseDate' | 'key'
  >
  isAuthenticated?: boolean
}

export function ShareButton({ title, isAuthenticated }: ShareButtonProps) {
  const shareSheetRef = useRef<BottomSheet>(null)

  const pushProtected = useProtectedPush()
  const { open } = useBottomSheetControl(shareSheetRef)

  const handlePress = useCallback(() => {
    if (isAuthenticated) {
      open()

      return
    }

    pushProtected({
      pathname: '/title/[type]/[key]',
      params: {
        type: title.type,
        key: title.key,
        action: BOTTOM_SHEET_ACTIONS.share
      }
    })
  }, [isAuthenticated, open, pushProtected, title])

  useBottomSheetAction(shareSheetRef, 'share', isAuthenticated)

  return (
    <>
      <Button
        icon={Share}
        variant='transparent'
        hapticStyle='success'
        onPress={handlePress}
      />
      {isAuthenticated && (
        <ShareBottomSheet
          title={title}
          ref={shareSheetRef}
        />
      )}
    </>
  )
}
