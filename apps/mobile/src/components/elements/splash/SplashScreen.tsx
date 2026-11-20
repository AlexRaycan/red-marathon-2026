import { COLORS } from '@app/tokens'
import { Image } from 'expo-image'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { HAPTIC_RAMP, HAPTIC_TRIGGERS } from '@/lib'

import splashIcon from '@/assets/images/splash-icon.png'

const ICON_SIZE = 128
const PULSE_INTERVAL_MS = 90
const CYCLE_PAUSE_MS = 700

export function SplashScreen() {
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const playCycle = () => {
      HAPTIC_RAMP.forEach((style, index) => {
        timers.push(
          setTimeout(() => {
            void HAPTIC_TRIGGERS.impact(style)
          }, index * PULSE_INTERVAL_MS)
        )
      })

      timers.push(
        setTimeout(
          playCycle,
          HAPTIC_RAMP.length * PULSE_INTERVAL_MS + CYCLE_PAUSE_MS
        )
      )
    }

    timers.push(setTimeout(playCycle, 300))

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <View style={[StyleSheet.absoluteFill, styles.root]}>
      <Image
        source={splashIcon}
        contentFit='contain'
        style={styles.icon}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bg.base
  },
  icon: {
    width: ICON_SIZE,
    aspectRatio: 1
  }
})
