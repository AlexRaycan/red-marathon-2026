import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import type { TSubscriptionType } from '@app/types'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, GlassContainer, ViewLayout } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import {
  SUBSCRIPTIONS,
  SubscriptionBackground,
  SubscriptionFeature,
  SubscriptionHeader,
  SubscriptionSelect
} from '@/components/pages/subscriptions'

import { useBottomSpace } from '@/hooks'

export default function Subscriptions() {
  const {
    inset: { top },
    bottomSpace
  } = useBottomSpace()

  const [selectedSubscription, setSelectedSubscription] =
    useState<TSubscriptionType>('annualy')

  return (
    <ViewLayout.Root>
      <SubscriptionBackground />

      <Toolbar
        isCloseButton
        style={{
          paddingHorizontal: LAYOUT['space-horizontal'],
          position: 'absolute',
          paddingVertical: top
        }}
      />

      <ViewLayout.Root>
        <View style={[styles.content, { paddingTop: top + SPACINGS[16] }]}>
          <SubscriptionHeader />

          <View
            style={[
              styles.inset,
              styles.features,
              { paddingBottom: bottomSpace }
            ]}
          >
            <View style={[styles.featuresDesc]}>
              <Text style={[styles.baseText, styles.upgradeText]}>
                Upgrade to Premium
              </Text>
              <SubscriptionFeature />
            </View>

            <GlassContainer style={[styles.actionsContainer]}>
              <View style={styles.subs}>
                {SUBSCRIPTIONS.map(sub => (
                  <SubscriptionSelect
                    key={sub.id}
                    subscription={sub}
                    isSelected={selectedSubscription === sub.id}

                    onPress={() => setSelectedSubscription(sub.id)}
                  />
                ))}
              </View>

              <Button
                label='Continue For Payment'
                size='lg'
                tintColor={COLORS.status.success}
                onPress={() => {}}
              />
            </GlassContainer>
          </View>
        </View>
      </ViewLayout.Root>
    </ViewLayout.Root>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: SPACINGS[8]
  },
  inset: { paddingHorizontal: LAYOUT['space-horizontal'] },
  baseText: { color: COLORS.text.primary },
  features: {
    flex: 1,
    justifyContent: 'space-between',
    gap: SPACINGS[8]
  },
  featuresDesc: { gap: SPACINGS[3] },
  upgradeText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold
  },
  actionsContainer: {
    gap: SPACINGS[8]
  },
  subs: { gap: SPACINGS[2] }
})
