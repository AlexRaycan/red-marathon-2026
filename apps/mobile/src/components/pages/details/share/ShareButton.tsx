import type { DiscoverDetailsResponse } from '@app/api'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { Share } from 'lucide-react-native'
import { useRef } from 'react'

import { Button } from '@/components/ui'

import { ShareBottomSheet } from '@/components/pages/details'

interface ShareButtonProps {
  title: DiscoverDetailsResponse
}

export function ShareButton({ title }: ShareButtonProps) {
  const shareSheetRef = useRef<BottomSheet>(null)

  // TODO: how to save opening state of share sheet when navigating away from the login page

  return (
    <>
      <Button
        icon={Share}
        variant='transparent'
        hapticStyle='success'
        onPress={() => shareSheetRef.current?.snapToIndex(0)}
      />
      <ShareBottomSheet
        title={title}
        ref={shareSheetRef}
      />
    </>
  )
}
