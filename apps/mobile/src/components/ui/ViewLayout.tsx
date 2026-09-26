import { StyleSheet, View, type ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ViewLayoutRootProps extends ViewProps {
  isInfinity?: boolean
  withToolbar?: boolean
}

function ViewLayoutRoot({
  style,
  children,
  isInfinity,
  withToolbar,
  ...props
}: ViewLayoutRootProps) {
  const insets = useSafeAreaInsets()
  const marginTop = withToolbar ? insets.top + 44 : insets.top

  return (
    <View
      style={[styles.root, style, isInfinity && { marginTop }]}
      {...props}
    >
      {children}
    </View>
  )
}

function ViewLayoutCenter({ style, children, ...props }: ViewProps) {
  return (
    <View
      style={[styles.centered, style]}
      {...props}
    >
      {children}
    </View>
  )
}

export const ViewLayout = {
  Root: ViewLayoutRoot,
  Center: ViewLayoutCenter
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center'
  }
})
