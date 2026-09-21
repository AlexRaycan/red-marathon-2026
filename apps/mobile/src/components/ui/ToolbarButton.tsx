import { COLORS, RADIUS } from '@app/tokens'
import { GlassView } from 'expo-glass-effect'
import { ChevronLeft, type LucideIcon, X } from 'lucide-react-native'
import { Pressable, type PressableProps, StyleSheet, View } from 'react-native'

import { isGlassEffectAvailable } from '@/lib/is-glass-effect-available'

interface LeftActionButtonProps extends PressableProps {
  isBackButton?: boolean
  isCloseButton?: boolean
}

export const LeftActionButton = ({
  isBackButton,
  isCloseButton
}: LeftActionButtonProps) => {
  const Icon: LucideIcon | null =
    isBackButton && !isCloseButton
      ? ChevronLeft
      : isCloseButton && !isBackButton
        ? X
        : null

  if (!Icon) return null

  if (!isGlassEffectAvailable()) {
    return (
      <Pressable
        hitSlop={12}
        style={styles.fallback}
      >
        {Icon && (
          <Icon
            color={COLORS.text.primary}
            style={isBackButton && { marginLeft: -2 }}
          />
        )}
      </Pressable>
    )
  }

  return (
    <View style={styles.root}>
      <GlassView
        glassEffectStyle='clear'
        isInteractive
        style={styles.glass}
      >
        <Pressable
          hitSlop={12}
          style={styles.press}
        >
          {Icon && (
            <Icon
              color={COLORS.text.primary}
              style={isBackButton && { marginLeft: -2 }}
            />
          )}
        </Pressable>
      </GlassView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: 40,
    aspectRatio: '1 / 1'
  },
  glass: {
    flex: 1,
    borderRadius: RADIUS.full
  },
  press: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fallback: {
    aspectRatio: '1 / 1',
    width: 40,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
})
