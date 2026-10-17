import type { DiscoverItemResponseType } from '@app/api'
import { RADIUS } from '@app/tokens'
import { StyleSheet, View } from 'react-native'

import { Card } from '@/components/ui'

import { TITLE_CARD_CONFIG } from './TitleCard.config'
import { TitleCardBadge } from './TitleCardBadge'
import { TitleCardBookFX } from './TitleCardBookFX'

interface Props {
  label?: string
  type: DiscoverItemResponseType
  coverUrl: string | null
  width?: number
  withBadge?: boolean
  borderRadius?: number
  onPress?: () => void
}

export function TitleCard({
  label,
  type,
  coverUrl,
  width,
  withBadge,
  borderRadius,
  onPress
}: Props) {
  const config = TITLE_CARD_CONFIG[type]

  return (
    <Card
      label={label}
      sourceImage={coverUrl}
      cardWidth={width}
      isStacked={config.stacked}
      cardStyle={[
        config.spine && {
          borderRadius: RADIUS.sm,
          overflow: 'hidden'
        },
        !!borderRadius && {
          borderRadius: borderRadius
        }
      ]}
      coverStyle={[
        config.spine && styles.bookCover,
        !!borderRadius && {
          borderRadius: borderRadius
        }
      ]}
      onPress={onPress}
    >
      {config.glow && (
        <View
          style={{
            borderRadius: borderRadius ?? RADIUS.md,
            flex: 1,
            boxShadow: `inset 0 0 8px 4px ${config.glow}`
          }}
        />
      )}

      {config.spine && <TitleCardBookFX />}

      {withBadge && (
        <TitleCardBadge
          accentColor={config.accent}
          icon={config.icon}
        />
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  bookCover: {
    borderTopLeftRadius: RADIUS.sm,
    borderBottomLeftRadius: RADIUS.sm
  }
})
