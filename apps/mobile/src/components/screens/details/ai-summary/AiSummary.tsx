import { useAiTitleSummary } from '@app/api'
import { useAuth } from '@app/hooks'
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  LAYOUT,
  RADIUS,
  SPACINGS
} from '@app/tokens'
import hexToRgba from 'hex-to-rgba'
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react-native'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, GlassView } from '@/components/ui'

interface AiSummaryProps {
  titleKy: string
}

const SKELETON_WIDTHS = ['100%', '60%', '80%'] as const

export function AiSummary({ titleKy }: AiSummaryProps) {
  const { isAuthenticated } = useAuth()
  const [isHide, setIsHide] = useState(true)

  const { data, isError, isPending } = useAiTitleSummary(titleKy, {
    query: {
      enabled: isAuthenticated && !isHide,
      staleTime: Infinity
    }
  })

  const summary = data?.status === 200 ? data?.data.summary : null

  if (!isAuthenticated || isError || (!isPending && !summary)) return null

  return (
    <GlassView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Sparkles
            size={16}
            color={COLORS.text.primary}
          />

          <Text style={styles.label}>AI Summary</Text>
        </View>

        <Button
          variant='transparent'
          icon={isHide ? ChevronDown : ChevronUp}
          onPress={() => setIsHide(prev => !prev)}
        />
      </View>

      {!isHide &&
        (isPending ? (
          SKELETON_WIDTHS.map(width => (
            <GlassView
              tintColor={hexToRgba(COLORS.bg.card, 0.6)}
              key={width}
              style={[styles.skeleton, { width }]}
            />
          ))
        ) : (
          <Text style={styles.summary}>{summary}</Text>
        ))}
    </GlassView>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: SPACINGS[2],
    marginHorizontal: LAYOUT['space-horizontal'],
    padding: LAYOUT['space-horizontal'],
    borderRadius: RADIUS.lg
  },
  skeleton: {
    height: FONT_SIZE.sm,
    borderRadius: RADIUS.sm
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[2],
    justifyContent: 'space-between'
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[2]
  },
  label: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold
  },
  summary: {
    color: COLORS.text['little-muted'],
    fontSize: FONT_SIZE.sm,
    lineHeight: FONT_SIZE.sm * 1.5
  }
})
