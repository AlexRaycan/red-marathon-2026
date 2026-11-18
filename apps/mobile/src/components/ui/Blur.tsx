import { BlurView, type BlurViewProps } from 'expo-blur'
import { Platform, StyleSheet } from 'react-native'

export function Blur({
  intensity = 60,
  style,
  children,
  ...props
}: BlurViewProps) {
  return (
    <BlurView
      intensity={intensity}
      blurMethod='dimezisBlurView'
      tint={Platform.OS === 'ios' ? 'systemChromeMaterialDark' : 'dark'}
      style={[StyleSheet.absoluteFill, style]}
      {...props}
    >
      {children}
    </BlurView>
  )
}
