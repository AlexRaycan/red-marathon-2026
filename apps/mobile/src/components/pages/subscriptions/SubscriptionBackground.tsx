import { COLORS } from '@app/tokens'
import { useId } from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg'

import { SubscriptionDecorations } from './SubscriptionDecorations'

const LAVENDER = '#B692FF'
const DEEP_VIOLET = '#4B1F8F'

export function SubscriptionBackground() {
  const id = useId()
  const primaryId = `${id}-primary`
  const lavenderId = `${id}-lavender`

  return (
    <View
      pointerEvents='none'
      style={StyleSheet.absoluteFill}
    >
      <Svg
        width='100%'
        height='100%'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
      >
        <Defs>
          <RadialGradient
            id={primaryId}
            gradientUnits='userSpaceOnUse'
            cx={85}
            cy={28}
            rx={100}
            ry={55}
          >
            <Stop
              offset={0}
              stopColor={COLORS.status.success}
              stopOpacity={0.75}
            />
            <Stop
              offset={0.5}
              stopColor={DEEP_VIOLET}
              stopOpacity={0.5}
            />
            <Stop
              offset={1}
              stopColor={DEEP_VIOLET}
              stopOpacity={0}
            />
          </RadialGradient>

          <RadialGradient
            id={lavenderId}
            gradientUnits='userSpaceOnUse'
            cx={18}
            cy={20}
            rx={80}
            ry={42}
          >
            <Stop
              offset={0}
              stopColor={LAVENDER}
              stopOpacity={0.4}
            />
            <Stop
              offset={1}
              stopColor={LAVENDER}
              stopOpacity={0}
            />
          </RadialGradient>
        </Defs>

        <Rect
          width={100}
          height={100}
          fill={COLORS.bg.base}
        />
        <Rect
          width={100}
          height={100}
          fill={`url(#${primaryId})`}
        />
        <Rect
          width={100}
          height={100}
          fill={`url(#${lavenderId})`}
        />
      </Svg>

      <SubscriptionDecorations />
    </View>
  )
}
