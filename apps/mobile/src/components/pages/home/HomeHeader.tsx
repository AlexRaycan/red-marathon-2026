import { PROJECT_NAME } from '@app/constants'
import { Toolbar } from '@components/ui/Toolbar'
import { Bell } from 'lucide-react-native'
import { type SharedValue } from 'react-native-reanimated'

import { Button } from '@/components/ui/Button'

interface IHomeHeaderProps {
  scrollY: SharedValue<number>
}

export function HomeHeader({ scrollY }: IHomeHeaderProps) {
  return (
    <Toolbar
      scrollY={scrollY}
      leftSide={PROJECT_NAME}
      rightSide={
        <Button
          variant='transparent'
          icon={Bell}
          size='lg'
        />
      }
    />
  )
}
