import { LAYOUT } from '@app/tokens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useBottomSpace() {
  const inset = useSafeAreaInsets()

  return {
    inset,
    bottomSpace: inset.bottom + LAYOUT['space-vertical']
  }
}
