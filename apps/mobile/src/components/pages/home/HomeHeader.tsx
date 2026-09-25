import { PROJECT_NAME } from '@app/constants'
import { LAYOUT } from '@app/tokens'
import { Toolbar } from '@components/ui/Toolbar'
import { Bell } from 'lucide-react-native'
import { StyleSheet } from 'react-native'
import { type SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/Button'

interface IHomeHeaderProps {
  scrollY: SharedValue<number>
}

export function HomeHeader({ scrollY }: IHomeHeaderProps) {
  const insets = useSafeAreaInsets()

  return (
    <Toolbar
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
      style={[
        styles.root,
        {
          paddingTop: insets.top * 2
        }
      ]}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: LAYOUT['space-horizontal']
  }
})
