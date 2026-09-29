import { COLORS } from '@app/tokens'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import {
  type StyleProp,
  StyleSheet,
  View,
  useWindowDimensions
} from 'react-native'
import type { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

const HERO_GRADIENT = {
  colors: [
    'rgba(2, 0, 3, 0.7)',
    'transparent',
    'rgba(2, 0, 3, 0.8)',
    COLORS.bg.base
  ],
  locations: [0, 0.35, 0.75, 1]
} as const

interface HeroBackdropProps {
  coverUrl: string | null
  height?: number
  style?: StyleProp<ViewStyle>
}

export const HeroBackdrop = ({
  coverUrl,
  height = 300,
  style
}: HeroBackdropProps) => {
  const { width } = useWindowDimensions()

  return (
    <View style={[{ width, height }, style]}>
      {coverUrl && (
        <Image
          source={coverUrl}
          contentFit='cover'
          transition={300}
          style={StyleSheet.absoluteFill}
        />
      )}
      <LinearGradient
        colors={HERO_GRADIENT.colors}
        locations={HERO_GRADIENT.locations}
        style={StyleSheet.absoluteFill}
        pointerEvents='none'
      />
    </View>
  )
}
