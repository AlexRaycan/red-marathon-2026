import { COLORS } from '@app/tokens'
import { StyleSheet, View, type ViewProps } from 'react-native'

import { useSpaces } from '@/hooks'

interface ViewLayoutRootProps extends ViewProps {
  hasBGColor?: boolean
  withToolbar?: boolean
  withTabbar?: boolean
}

function ViewLayoutRoot({
  hasBGColor = false,
  withToolbar,
  withTabbar,
  style,
  children,
  ...props
}: ViewLayoutRootProps) {
  const { toolbarSpace, tabbarSpace } = useSpaces()

  return (
    <View
      style={[
        styles.root,
        hasBGColor && styles.bgColor,
        withToolbar && {
          paddingTop: toolbarSpace
        },
        withTabbar && {
          paddingBottom: tabbarSpace
        },
        style
      ]}
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

function ViewLayoutFooter({ style, children, ...props }: ViewProps) {
  const { tabbarSpace } = useSpaces()

  return (
    <View
      style={[{ paddingBottom: tabbarSpace }, styles.footer, style]}
      {...props}
    >
      {children}
    </View>
  )
}

export const ViewLayout = {
  Root: ViewLayoutRoot,
  Center: ViewLayoutCenter,
  Footer: ViewLayoutFooter
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center'
  },
  footer: {
    justifyContent: 'center'
  },
  bgColor: { backgroundColor: COLORS.bg.base }
})
