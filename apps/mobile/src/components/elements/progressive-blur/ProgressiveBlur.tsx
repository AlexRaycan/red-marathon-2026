import MaskedView from '@expo/ui/community/masked-view'
import { BlurTargetView, BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import type { PropsWithChildren, RefObject } from 'react'
import { StyleSheet, View, type ViewInstance } from 'react-native'

const BLUR_FADE_HEIGHT = 64

interface MaskProps {
  ref: RefObject<ViewInstance | null>
  height?: number
  offset?: number
}

function Blur({ ref, height = BLUR_FADE_HEIGHT, offset = 0 }: MaskProps) {
  return (
    <MaskedView
      pointerEvents='none'
      style={[StyleSheet.absoluteFill, { bottom: -height / 2 - offset }]}
      maskElement={
        <View style={styles.blurMask}>
          <View style={styles.blurMaskSolid} />
          <LinearGradient
            colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ height: height }}
          />
        </View>
      }
    >
      <BlurView
        blurTarget={ref}
        blurMethod='dimezisBlurView'
        intensity={60}
        tint='systemChromeMaterialDark'
        style={StyleSheet.absoluteFill}
      />
    </MaskedView>
  )
}

interface TargetProps extends PropsWithChildren, Pick<MaskProps, 'ref'> {}

function Target({ ref, children }: TargetProps) {
  return (
    <BlurTargetView
      ref={ref}
      style={styles.blurTarget}
    >
      {children}
    </BlurTargetView>
  )
}

const styles = StyleSheet.create({
  blurTarget: {
    flex: 1
  },
  blurMask: {
    flex: 1
  },
  blurMaskSolid: {
    flex: 1,
    backgroundColor: 'black'
  }
})

export const ProgressiveBlur = {
  Blur,
  Target
}
