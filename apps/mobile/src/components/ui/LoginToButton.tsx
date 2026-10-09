import { COLORS } from '@app/tokens'
import { LogIn } from 'lucide-react-native'
import type { ComponentProps } from 'react'

import { Button } from './Button'

export function LoginToButton({
  label = 'Go to Login',
  tintColor = COLORS.status.success,
  style,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      label={label}
      icon={LogIn}
      tintColor={tintColor}
      size='lg'
      {...props}
    />
  )
}
