import type { DiscoverItemResponse } from '@app/api'
import { RADIUS } from '@app/tokens'
import { StyleSheet } from 'react-native'

import { Card } from '@/components/ui/Card/Card'

import { TITLE_CARD_CONFIG } from './TitleCard.config'
import { TitleCardBadge } from './TitleCardBadge'
import { TitleCardBookFX } from './TitleCardBookFX'

interface Props {
  title: Pick<DiscoverItemResponse, 'type' | 'coverUrl'>
  width: number
  withBadge?: boolean
  borderRadius?: number
  onPress?: () => void
}

export function TitleCard({
  title,
  width,
  withBadge,
  borderRadius,
  onPress
}: Props) {
  const config = TITLE_CARD_CONFIG[title.type]

  return (
    <Card
      sourceImage={title.coverUrl}
      cardWidth={width}
      isStacked={config.stacked}
      cardStyle={[
        config.glow && {
          boxShadow: `inset 0 0 8px 4px ${config.glow}`
        },
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
