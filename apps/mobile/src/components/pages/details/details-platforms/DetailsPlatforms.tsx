import type { DiscoverDetailsResponseMetadata } from '@app/api'
import { COLORS, FONT_SIZE, SPACINGS } from '@app/tokens'
import { normalizePlatform } from '@app/utils'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { PlatformIcon } from '@/components/ui'

interface DetailsPlatformsProps {
  metadata: DiscoverDetailsResponseMetadata
}

export function DetailsPlatforms({ metadata }: DetailsPlatformsProps) {
  const platforms = useMemo(() => {
    if (
      Object.hasOwn(metadata, 'platforms') &&
      Array.isArray(metadata.platforms)
    )
      return Object.values(metadata.platforms).map(normalizePlatform)
  }, [metadata.platforms])

  return (
    platforms &&
    !!platforms.length && (
      <View style={styles.platforms}>
        {platforms.map(p => (
          <PlatformIcon
            key={p}
            platform={p}
            color={COLORS.text.primary}
            size={FONT_SIZE.sm}
          />
        ))}
      </View>
    )
  )
}

const styles = StyleSheet.create({
  platforms: {
    flexDirection: 'row',
    gap: SPACINGS[1],
    alignItems: 'center',
    transform: [{ translateY: 1.7 }]
  }
})
