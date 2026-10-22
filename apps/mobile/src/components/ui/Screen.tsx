import { COLORS, LAYOUT } from '@app/tokens'
import { StyleSheet } from 'react-native'
import {
  SafeAreaView,
  type SafeAreaViewProps,
  useSafeAreaInsets
} from 'react-native-safe-area-context'

interface Props extends SafeAreaViewProps {
  hasBGColor?: boolean
  withPaddings?: boolean
}

export function Screen({
  edges = [],
  hasBGColor = true,
  withPaddings,
  style,
  children,
  ...props
}: Props) {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      {...props}
      edges={edges}
      style={[
        styles.root,
        { marginTop: -insets.top },
        hasBGColor && {
          backgroundColor: COLORS.bg.base
        },
        withPaddings && {
          paddingHorizontal: LAYOUT['space-horizontal']
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
    position: 'relative'
  }
})
