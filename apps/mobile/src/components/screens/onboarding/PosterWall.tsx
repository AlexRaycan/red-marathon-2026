import { COLORS } from '@app/tokens'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View, useWindowDimensions } from 'react-native'

import { PosterColumn } from './PosterColumn'
import { COLUMNS, GAP, WALL_TRANSFORM } from './onboarding.data'

interface PosterWallProps {
  coverUrls: string[]
}

export function PosterWall({ coverUrls }: PosterWallProps) {
  const { width } = useWindowDimensions()

  const posterWidth = width / (COLUMNS - 1)

  const columns = Array.from({ length: COLUMNS }, (_, column) =>
    coverUrls.filter((_, index) => index % COLUMNS === column)
  )

  return (
    <View style={styles.root}>
      <View style={styles.tilt}>
        {columns.map((columnUrls, index) => (
          <PosterColumn
            key={index}
            coverUrls={columnUrls}
            posterWidth={posterWidth}
            isReversed={index % 2 === 1}
          />
        ))}
      </View>

      <LinearGradient
        colors={['transparent', COLORS.bg.base]}
        locations={[0.3, 0.7]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden'
  },
  tilt: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    transformOrigin: '50% 30%',
    gap: GAP,
    transform: [
      {
        rotate: WALL_TRANSFORM.rotate
      },
      {
        scale: WALL_TRANSFORM.scale
      }
    ]
  }
})
