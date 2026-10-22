import { LAYOUT } from '@app/tokens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useSpaces() {
  const inset = useSafeAreaInsets()

  return {
    inset,
    toolbarSpace: inset.top * 2,
    tabbarSpace: inset.bottom + LAYOUT['space-vertical']
  }
}
