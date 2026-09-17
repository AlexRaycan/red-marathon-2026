import { PROJECT_NAME } from '@app/constants'
import { COLORS } from '@app/tokens'
import { Toolbar } from '@components/ui/Toolbar'
import { Bell } from 'lucide-react-native'
import { Pressable } from 'react-native'

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
