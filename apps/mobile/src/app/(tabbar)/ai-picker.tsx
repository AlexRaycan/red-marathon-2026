import {
  type PickerDtoDuration,
  getApiErrorMessage,
  useAiPickTitle
} from '@app/api'
import { useAuth } from '@app/hooks'
import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { type TTitleType } from '@app/types'
import { Sparkles } from 'lucide-react-native'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { Button, Screen, ViewLayout } from '@/components/ui'

import {
  AiSuggestionsGrid,
  ChipFilter,
  TypeFilter
} from '@/components/elements'

import { useProtectedPush, useSpaces } from '@/hooks'

import { DURATION_OPTIONS_MOBILE, MOOD_OPTIONS_MOBILE } from '@/constants'

export default function AiPicker() {
  const { isAuthenticated } = useAuth()

  const [mood, setMood] =
    useState<(typeof MOOD_OPTIONS_MOBILE)[number]['value']>(null)
  const [type, setType] = useState<TTitleType | null>(null)
  const [duration, setDuration] = useState<PickerDtoDuration | null>(null)

  const pushProtected = useProtectedPush()
  const { toolbarSpace } = useSpaces()

  const { mutate, data, isPending, error } = useAiPickTitle()

  const suggestions =
    data?.status === 200 ? data.data.items.map(({ item }) => item) : []

  const pick = () => {
    if (!isAuthenticated) {
      pushProtected('/(tabbar)/ai-picker')

      return
    }

    mutate({
      data: {
        mood: mood ?? undefined,
        type: type ? [type] : undefined,
        duration: duration ?? undefined,
        excludeLibrary: true
      }
    })
  }

  return (
    <Screen>
      <ScrollView
        contentInsetAdjustmentBehavior='never'
        contentContainerStyle={[{ paddingTop: toolbarSpace }]}
      >
        <ViewLayout.Root style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Sparkles
                size={26}
                color={COLORS.text.primary}
              />
              <Text style={styles.title}>AI Picker</Text>
            </View>

            <Text style={styles.subtitle}>
              Set your mood and preferences, AI will find the perfect match
            </Text>
          </View>

          <Text style={styles.section}>How do you feel?</Text>
          <ChipFilter
            options={MOOD_OPTIONS_MOBILE}
            value={mood}
            onChange={setMood}
          />

          <Text style={styles.section}>What do you want?</Text>
          <TypeFilter
            value={type}
            onChange={setType}
          />

          <Text style={styles.section}>Duration</Text>
          <ChipFilter
            options={DURATION_OPTIONS_MOBILE}
            value={duration}
            onChange={setDuration}
          />

          <View style={styles.action}>
            <Button
              label={isPending ? 'Picking...' : 'Surprise me!'}
              icon={Sparkles}
              size='lg'
              tintColor={COLORS.status.success}
              disabled={isPending}
              onPress={pick}
            />
          </View>

          {!!error && (
            <Text style={styles.error}>{getApiErrorMessage(error)}</Text>
          )}

          {/* TODO: skeleton grid */}

          {!!suggestions.length && (
            <>
              <Text style={styles.section}>AI picks for you</Text>
              <AiSuggestionsGrid suggestions={suggestions} />
            </>
          )}
        </ViewLayout.Root>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: SPACINGS[3],
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  header: {
    gap: SPACINGS[2],
    marginBottom: SPACINGS[2]
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[2]
  },
  title: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['3xl'],
    fontWeight: FONT_WEIGHT.bold
  },
  subtitle: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.sm,
    lineHeight: FONT_SIZE.sm * 1.5
  },
  section: {
    marginTop: SPACINGS[2],
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semibold
  },
  action: {
    marginVertical: SPACINGS[4]
  },
  error: {
    color: COLORS.status.error,
    fontSize: FONT_SIZE.sm
  }
})
