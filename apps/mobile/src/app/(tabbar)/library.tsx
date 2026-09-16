import { COLORS, FONT_SIZE, SPACINGS } from '@app/tokens'
import { StyleSheet } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Toolbar } from '@/components/ui/Toolbar'

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
