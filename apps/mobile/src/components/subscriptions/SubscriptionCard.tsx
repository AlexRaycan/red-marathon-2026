import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACINGS } from '@app/tokens'
import type { ISubscription } from '@app/types'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '../ui'

import { SubscriptionFeature } from './SubscriptionFeature'

interface SubscriptionCardProps {
  subsription: ISubscription
  width: number
  onPress: () => void
}

export function SubscriptionCard({
  subsription,
  width,
  onPress
}: SubscriptionCardProps) {
  const { price, name, trialPeriod: period, badge } = subsription

  return (
    <View style={styles.root}>
      {!!badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.period}>{period}</Text>
      </View>

      <View style={styles.divider} />

      <SubscriptionFeature />

      <Button
        label='Get Started'
        size='lg'
        tintColor={COLORS.status.success}
        onPress={onPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: SPACINGS[5],
    padding: SPACINGS[6],
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.bg.card
  },
  badge: {
    position: 'absolute',
    top: SPACINGS[4],
    right: SPACINGS[4],
    paddingHorizontal: SPACINGS[3],
    paddingVertical: SPACINGS[1],
    backgroundColor: COLORS.status.success,
    borderWidth: 1,
    borderColor: COLORS.text['little-muted'],
    borderRadius: RADIUS.full
  },
  badgeText: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.xs
  },
  header: {
    alignItems: 'center',
    gap: SPACINGS[1],
    marginTop: SPACINGS[6]
  },
  price: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['3xl'],
    fontWeight: FONT_WEIGHT.bold
  },
  name: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold
  },
  period: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.sm
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.secondary
  }
})
