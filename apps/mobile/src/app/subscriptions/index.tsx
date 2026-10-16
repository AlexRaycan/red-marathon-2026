import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  LAYOUT,
  RADIUS,
  SPACINGS
} from '@app/tokens'
import type { TSubscriptionType } from '@app/types'
import hexToRgba from 'hex-to-rgba'
import { useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button, GlassContainer, Screen, ViewLayout } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import {
  SUBSCRIPTIONS,
  SubscriptionBackground,
  SubscriptionFeature
} from '@/components/subscriptions'

import { useBottomSpace } from '@/hooks'

const CARD_PEEK = SPACINGS[4]

export default function Subscriptions() {
  const { width } = useWindowDimensions()
  const { top } = useSafeAreaInsets()
  const { bottomSpace } = useBottomSpace()

  const [selectedSubscription, setSelectedSubscription] =
    useState<TSubscriptionType>('annualy')

  const cardWidth = width - CARD_PEEK * 2

  return (
    <Screen
      isInfitinyMode
      withExtraMarginTop={false}
    >
      <SubscriptionBackground />

      <ViewLayout.Root>
        <View style={[styles.content, { paddingTop: top + SPACINGS[16] }]}>
          <View style={styles.inset}>
            <Toolbar isCloseButton />
          </View>

          <View style={styles.header}>
            <Text style={[styles.baseText, styles.title]}>
              <Text style={styles.textAccent}>Get Access</Text>
              <Text style={styles.subtituteText}> With SagaSet&nbsp;</Text>
              <Text style={styles.textAccent}>Premium</Text>
            </Text>
          </View>

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
                  <Button
                    key={sub.id}
                    size='lg'
                    variant='secondary'
                    tintColor={
                      selectedSubscription === sub.id
                        ? hexToRgba(COLORS.status.success, 0.3)
                        : 'transparent'
                    }
                    style={styles.subButton}
                    onPress={() => setSelectedSubscription(sub.id)}
                  >
                    <View style={styles.subButtonContent}>
                      <View
                        style={[
                          styles.radioButton,
                          selectedSubscription === sub.id &&
                            styles.radioButtonActive
                        ]}
                      >
                        {selectedSubscription === sub.id && (
                          <View style={styles.radioButtonFill} />
                        )}
                      </View>
                      <View style={styles.subLabel}>
                        <Text
                          style={[
                            styles.baseText,
                            styles.textAccent,
                            styles.subName
                          ]}
                        >
                          {sub.name}
                        </Text>
                        <Text
                          style={[
                            styles.baseText,
                            styles.subtituteText,
                            styles.trial
                          ]}
                        >
                          {sub.trialPeriod}
                        </Text>
                      </View>

                      <View style={styles.price}>
                        <Text
                          style={[
                            styles.baseText,
                            styles.textAccent,
                            styles.priceAmount
                          ]}
                        >
                          {sub.price}
                        </Text>
                        <Text
                          style={[
                            styles.baseText,
                            styles.subtituteText,
                            styles.pricePeriod
                          ]}
                        >
                          {'/'}
                          {sub.period}
                        </Text>
                      </View>
                    </View>
                  </Button>
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

          {/* <ScrollView
            horizontal
            style={styles.carousel}
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth + SPACINGS[3]}
            decelerationRate='fast'
            contentContainerStyle={styles.cards}
          >
            {SUBSCRIPTIONS.map(sub => (
              <SubscriptionCard
                key={sub.id}
                subsription={sub}
                width={cardWidth}
                onPress={() => {}}
              />
            ))}
          </ScrollView> */}
        </View>
      </ViewLayout.Root>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: SPACINGS[8]
  },
  inset: { paddingHorizontal: LAYOUT['space-horizontal'] },
  header: {
    paddingTop: SPACINGS[4],
    paddingBottom: SPACINGS[16]
  },
  carousel: { flexGrow: 0 },
  baseText: { color: COLORS.text.primary },
  subtituteText: { color: COLORS.text.primary, opacity: 0.65 },
  title: {
    fontSize: FONT_SIZE.giant,
    fontWeight: FONT_WEIGHT.light,
    textAlign: 'center'
  },
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
  textAccent: {
    fontWeight: FONT_WEIGHT.bold
  },
  actionsContainer: {
    gap: SPACINGS[8]
  },
  subs: { gap: SPACINGS[2] },
  subButton: { height: 'auto', paddingVertical: SPACINGS[5] },
  subButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACINGS[3]
  },
  radioButton: {
    width: 24,
    height: 24,
    padding: 2,
    overflow: 'hidden',
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.text.primary,
    opacity: 0.45
  },
  radioButtonActive: { borderColor: COLORS.status.success, opacity: 1 },
  radioButtonFill: {
    flex: 1,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.status.success
  },
  subLabel: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: SPACINGS[1]
  },
  subName: { fontSize: FONT_SIZE.base },
  trial: {},
  price: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  priceAmount: { fontSize: FONT_SIZE.base },
  pricePeriod: { fontSize: FONT_SIZE.xs },
  cards: {
    alignItems: 'flex-start',
    gap: SPACINGS[3],
    paddingHorizontal: CARD_PEEK
  }
})
