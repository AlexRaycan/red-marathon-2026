import { COLORS, RADIUS, SPACINGS } from '@app/tokens'
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect'
import { type LucideIcon, Sparkle } from 'lucide-react-native'
import { StyleSheet, View } from 'react-native'

interface Props {
  accentColor?: string
  icon: LucideIcon
}

export function TitleCardBadge({
  accentColor = 'rgba(0, 0, 255, 0.38)',
  icon: Icon = Sparkle
}: Props) {
  return (
    <View style={styles.badge}>
      {isGlassEffectAPIAvailable() ? (
        <GlassView
          glassEffectStyle='clear'
          style={[
            styles.glass,
            {
              backgroundColor: accentColor
            }
          ]}
        >
          <Icon
            size={13}
            color={COLORS.text.primary}
            strokeWidth={2.2}
          />
        </GlassView>
      ) : (
        <View style={[styles.glass, styles.fallback]}>
          <Icon
            size={13}
            color={COLORS.text.primary}
            strokeWidth={2.2}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    left: SPACINGS[2],
    bottom: SPACINGS[2]
  },
  glass: {
    width: 26,
    height: 26,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  fallback: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
  }
})
