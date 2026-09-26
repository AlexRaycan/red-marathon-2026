import { COLORS, FONT_SIZE, SPACINGS } from '@app/tokens'
import { StyleSheet } from 'react-native'

import { Toolbar } from '@/components/toolbar/Toolbar'
import { Screen } from '@/components/ui/Screen'

export default function LibraryScreen() {
  return (
    <Screen>
      <Toolbar leftSide='Library' />
    </Screen>
  )
}

const styles = StyleSheet.create({
  item: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.base,
    paddingVertical: SPACINGS[3]
  }
})
