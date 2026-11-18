import { COLORS } from '@app/tokens'
import { StyleSheet, View, type ViewProps } from 'react-native'

import { useSpaces } from '@/hooks'

const DEFAULT_MAX_WIDTH = 440

interface ViewContainerProps extends ViewProps {
  isAdaptive?: boolean
  maxWidth?: number
}

interface ViewLayoutRootProps extends ViewContainerProps {
  hasBGColor?: boolean
  withToolbar?: boolean
  withTabbar?: boolean
}

function ViewLayoutRoot({
  hasBGColor = false,
  withToolbar,
  withTabbar,
  isAdaptive,
  maxWidth = DEFAULT_MAX_WIDTH,
  style,
  children,
  ...props
}: ViewLayoutRootProps) {
  const { statusbarSpace, tabbarSpace } = useSpaces()

  return (
    <View
      style={[
        styles.root,
        hasBGColor && styles.bgColor,
        withToolbar && {
          paddingTop: statusbarSpace
        },
        withTabbar && {
          paddingBottom: tabbarSpace
        },
        isAdaptive && [styles.adaptive, { maxWidth }],
        style
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

function ViewLayoutCenter({
  isAdaptive,
  maxWidth = DEFAULT_MAX_WIDTH,
  style,
  children,
  ...props
}: ViewContainerProps) {
  return (
    <View
      style={[
        styles.centered,
        isAdaptive && [styles.adaptive, { maxWidth }],
        style
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

function ViewLayoutFooter({
  isAdaptive,
  maxWidth = DEFAULT_MAX_WIDTH,
  style,
  children,
  ...props
}: ViewContainerProps) {
  const { tabbarSpace } = useSpaces()

  return (
    <View
      style={[
        { paddingBottom: tabbarSpace },
        styles.footer,
        isAdaptive && [styles.adaptive, { maxWidth }],
        style
      ]}
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
  adaptive: {
    width: '100%',
    alignSelf: 'center'
  },
  bgColor: { backgroundColor: COLORS.bg.base }
})
