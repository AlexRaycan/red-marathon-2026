import { router } from 'expo-router'
import { ChevronLeft, type LucideIcon, X } from 'lucide-react-native'
import { type PressableProps } from 'react-native'

import { Button } from '@/components/ui'

interface ToolbarActionButtonProps extends PressableProps {
  isBackButton?: boolean
  isCloseButton?: boolean
  onPress?: () => void
}

export const ToolbarActionButton = ({
  isBackButton,
  isCloseButton,
  onPress
}: ToolbarActionButtonProps) => {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back() // Safely goes back to the previous screen
    } else {
      router.replace('/') // Fallback to home page if no history exists
    }
  }

  const Icon: LucideIcon | null =
    isBackButton && !isCloseButton
      ? ChevronLeft
      : isCloseButton && !isBackButton
        ? X
        : null

  if (!Icon) return null

  return (
    <Button
      icon={Icon}
      variant='secondary'
      {...(isBackButton ? { onPress: handleBack } : { onPress: onPress })}
    />
  )
}
