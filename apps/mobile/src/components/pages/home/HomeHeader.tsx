import { PROJECT_NAME } from '@app/constants'
import { COLORS } from '@app/tokens'
import { Toolbar } from '@components/ui/Toolbar'
import { Bell } from 'lucide-react-native'
import { Pressable } from 'react-native'
import { type SharedValue } from 'react-native-reanimated'

interface IHomeHeaderProps {
  scrollY: SharedValue<number>
}

export function HomeHeader({ scrollY }: IHomeHeaderProps) {
  return (
    <Toolbar
      scrollY={scrollY}
      leftSide={PROJECT_NAME}
      rightSide={
        <Pressable hitSlop={12}>
          <Bell color={COLORS.text.primary} />
        </Pressable>
      }
    />
  )
}
