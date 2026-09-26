import { Button } from '@components/ui/Button'
import { router } from 'expo-router'
import { ChevronLeft, type LucideIcon, X } from 'lucide-react-native'
import { type PressableProps } from 'react-native'

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
      {...(isBackButton ? { onPress: router.back } : { onPress: onPress })}
    />
  )
}
