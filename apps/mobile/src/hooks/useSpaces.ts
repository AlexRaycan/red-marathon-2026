import { LAYOUT, SPACINGS } from '@app/tokens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useSpaces() {
  const inset = useSafeAreaInsets()

  return {
    inset,
    statusbarSpace: inset.top * 2,
    toolbarSpace: inset.top * 2 + SPACINGS[9] + SPACINGS[4],
    tabbarSpace: inset.bottom + LAYOUT['space-vertical']
  }
}
