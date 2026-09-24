import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import { Platform, StyleSheet } from 'react-native'
import {
  SafeAreaView,
  type SafeAreaViewProps,
  useSafeAreaInsets
} from 'react-native-safe-area-context'

const currentPlatform = Platform.OS

interface Props extends SafeAreaViewProps {
  isInfitinyMode?: boolean
  withPaddings?: boolean
}

export function Screen({
  edges = ['top'],
  isInfitinyMode,
  withPaddings,
  style,
  children,
  ...props
}: Props) {
  const inset = useSafeAreaInsets()
  const marginTop =
    currentPlatform === 'ios' ? -inset.top : -inset.top + SPACINGS[4]

  return (
    <SafeAreaView
      {...props}
      edges={edges}
      style={[
        styles.root,
        isInfitinyMode && { marginTop },
        withPaddings && {
          paddingHorizontal: LAYOUT['space-horizontal'],
          paddingBottom: inset.bottom + LAYOUT['space-vertical']
        },
        style
      ]}
    >
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg.base
  }
})
