import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  LAYOUT,
  RADIUS,
  SPACINGS
} from '@app/tokens'
import hexToRgba from 'hex-to-rgba'
import { ChevronDown, Sparkles } from 'lucide-react-native'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { GlassView, Pressable } from '@/components/ui'

const SKELETON_WIDTHS = ['100%', '60%', '80%'] as const

const AnimatedGlassView = Animated.createAnimatedComponent(GlassView)

interface AiTextCardProps {
  title: string
  text: string | null
  hidden?: {
    isHide: boolean
    setIsHide: (isHide: boolean) => void
  }
  isLoading: boolean
}

export function AiTextCard({
  title,
  text,
  hidden,
  isLoading
}: AiTextCardProps) {
  const { isHide, setIsHide } = hidden ?? {}
  const withHidden = isHide !== undefined && setIsHide !== undefined

  const chevronRotate = useSharedValue(0)

  const chevronAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronRotate.value}deg` }]
  }))

  useEffect(() => {
    chevronRotate.set(withSpring(isHide ? 0 : 180))
  }, [isHide, chevronRotate])

  return (
    <AnimatedGlassView
      layout={LinearTransition.duration(300)}
      tintColor={'transparency'}
      style={styles.root}
    >
      <Pressable
        style={styles.header}
        {...(withHidden && { onPress: () => setIsHide(!isHide) })}
      >
        <View style={styles.title}>
          <Sparkles
            size={16}
            color={COLORS.text.primary}
          />

          <Text style={styles.label}>{title}</Text>
        </View>

        {withHidden && (
          <Animated.View style={[chevronAnimatedStyle]}>
            <ChevronDown
              size={24}
              color={COLORS.text.primary}
            />
          </Animated.View>
        )}
      </Pressable>

      {withHidden &&
        !isHide &&
        (isLoading ? (
          SKELETON_WIDTHS.map(width => (
            <GlassView
              tintColor={hexToRgba(COLORS.bg.card, 0.6)}
              key={width}
              style={[styles.skeleton, { width }]}
            />
          ))
        ) : (
          <Text style={styles.summary}>{text}</Text>
        ))}
    </AnimatedGlassView>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: SPACINGS[2],
    marginHorizontal: LAYOUT['space-horizontal'],
    padding: LAYOUT['space-horizontal'],
    borderRadius: RADIUS.lg,
    overflow: 'hidden'
  },
  skeleton: {
    height: FONT_SIZE.sm,
    borderRadius: RADIUS.sm
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[2],
    justifyContent: 'space-between'
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[2]
  },
  label: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold
  },
  summary: {
    color: COLORS.text['little-muted'],
    fontSize: FONT_SIZE.sm,
    lineHeight: FONT_SIZE.sm * 1.5
  }
})
