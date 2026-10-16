import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACINGS } from '@app/tokens'
import type { ISubscription } from '@app/types'
import { Check } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '../ui'

import { SUBSCRIPTION_FEATURES } from './subscriptions.data'

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
  const { price, name, period, badge } = subsription

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

      <View style={styles.features}>
        {SUBSCRIPTION_FEATURES.map(({ label, isPremium }) => (
          <View
            key={label}
            style={styles.feature}
          >
            <View style={[styles.check, isPremium && styles.checkPremium]}>
              <Check
                size={12}
                color={COLORS.text.primary}
                strokeWidth={3}
              />
            </View>
            <Text style={styles.featureText}>{label}</Text>
          </View>
        ))}
      </View>

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
  },
  features: {
    gap: SPACINGS[3]
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[3]
  },
  check: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.secondary
  },
  checkPremium: {
    backgroundColor: COLORS.status.success
  },
  featureText: {
    flexShrink: 1,
    color: COLORS.text['little-muted'],
    fontSize: FONT_SIZE.sm
  }
})
