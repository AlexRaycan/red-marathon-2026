import type { TitleMetadataResponse } from '@app/api'
import { COLORS, FONT_SIZE, SPACINGS } from '@app/tokens'
import { normalizePlatform } from '@app/utils'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { PlatformIcon } from '@/components/ui'

interface DetailsPlatformsProps {
  metadata: TitleMetadataResponse
}

export function DetailsPlatforms({ metadata }: DetailsPlatformsProps) {
  const platforms = useMemo(
    () => [...new Set((metadata.platforms ?? []).map(normalizePlatform))],
    [metadata.platforms]
  )

  return platforms.length ? (
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
  ) : null
}

const styles = StyleSheet.create({
  platforms: {
    flexDirection: 'row',
    gap: SPACINGS[1],
    alignItems: 'center',
    transform: [{ translateY: 1.7 }]
  }
})
