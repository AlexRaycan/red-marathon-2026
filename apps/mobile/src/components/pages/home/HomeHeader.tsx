import { PROJECT_NAME } from '@app/constants'
import { Bell } from 'lucide-react-native'
import { type SharedValue } from 'react-native-reanimated'

import { Button } from '@/components/ui'

import { Toolbar } from '@/components/toolbar'

interface IHomeHeaderProps {
  scrollY: SharedValue<number>
}

export function HomeHeader({ scrollY }: IHomeHeaderProps) {
  return (
    <Toolbar
      isAbsolute
      withBlur
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
