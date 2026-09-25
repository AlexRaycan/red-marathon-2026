import { StyleSheet, View, type ViewProps } from 'react-native'

function ViewLayoutRoot({ style, children, ...props }: ViewProps) {
  return (
    <View
      style={[styles.root, style]}
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
