import { PROJECT_NAME } from '@app/constants'
import { COLORS } from '@app/tokens'
import { Bell } from 'lucide-react-native'
import { Pressable } from 'react-native'

import { Toolbar } from './ui/Toolbar'

export function HomeHeader() {
  return (
    <Toolbar
      leftSide={PROJECT_NAME}
      rightSide={
        <Pressable hitSlop={12}>
          <Bell color={COLORS.text.primary} />
        </Pressable>
      }
    />
  )
}
