import { COLORS, LAYOUT, SPACINGS } from '@app/tokens'
import { StyleSheet } from 'react-native'
import {
  SafeAreaView,
  type SafeAreaViewProps,
  useSafeAreaInsets
} from 'react-native-safe-area-context'

interface Props extends SafeAreaViewProps {
  isInfitinyMode?: boolean
  withPaddings?: boolean
  withExtraMarginTop?: boolean
  hasBGColor?: boolean
}

export function Screen({
  edges = ['top'],
  isInfitinyMode,
  withPaddings,
  withExtraMarginTop = true,
  hasBGColor = true,
  style,
  children,
  ...props
}: Props) {
  const inset = useSafeAreaInsets()
  const extraTop = withExtraMarginTop ? SPACINGS[4] : 0

  // TODO: refactor, todo smth with marginTop
  return (
    <SafeAreaView
      {...props}
      edges={edges}
      style={[
        styles.root,
        isInfitinyMode && { marginTop: -inset.top + extraTop },
        withPaddings && {
          paddingHorizontal: LAYOUT['space-horizontal'],
          paddingBottom: inset.bottom + LAYOUT['space-vertical']
        },
        hasBGColor && {
          backgroundColor: COLORS.bg.base
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
    flex: 1
  }
})
