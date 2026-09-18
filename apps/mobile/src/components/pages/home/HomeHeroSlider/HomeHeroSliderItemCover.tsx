import type { TitleListItemResponse } from '@app/api'
import { COLORS } from '@app/tokens'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { type StyleProp, StyleSheet, View } from 'react-native'
import type { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

export const HomeHeroSliderItemCover = ({
  item,
  style
}: {
  item: TitleListItemResponse
  style?: StyleProp<ViewStyle>
}) => (
  <View style={[style]}>
    <Image
      source={item.coverUrl}
      contentFit='cover'
      transition={300}
      style={StyleSheet.absoluteFill}
    />
    <LinearGradient
      colors={[
        'rgba(2, 0, 3, 0.7)',
        'transparent',
        'rgba(2, 0, 3, 0.8)',
        COLORS.bg.base
      ]}
      locations={[0, 0.35, 0.75, 1]}
      style={StyleSheet.absoluteFill}
      pointerEvents='none'
    />
  </View>
)
