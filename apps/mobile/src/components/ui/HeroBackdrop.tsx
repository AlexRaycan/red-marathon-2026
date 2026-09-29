import type { DiscoverItemResponse } from '@app/api/src/generated/model'
import { COLORS } from '@app/tokens'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { type StyleProp, StyleSheet, View } from 'react-native'
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
  item?: Pick<DiscoverItemResponse, 'coverUrl'>
  style?: StyleProp<ViewStyle>
}

export const HeroBackdrop = ({ item, style }: HeroBackdropProps) => (
  <View style={[style]}>
    {item && (
      <Image
        source={item.coverUrl}
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
