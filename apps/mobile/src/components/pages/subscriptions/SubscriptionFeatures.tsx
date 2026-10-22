import { COLORS, FONT_SIZE, RADIUS, SPACINGS } from '@app/tokens'
import { Check } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { SUBSCRIPTION_FEATURES } from './subscriptions.data'

export function SubscriptionFeatures() {
  return (
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
          <Text
            style={[styles.featureText, isPremium && styles.featureTextPremium]}
          >
            {label}
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.secondary,
    opacity: 0.65
  },
  checkPremium: {
    backgroundColor: COLORS.status.success,
    opacity: 1
  },
  featureText: {
    flexShrink: 1,
    color: COLORS.text.primary,
    opacity: 0.65,
    fontSize: FONT_SIZE.sm
  },
  featureTextPremium: {
    opacity: 1
  }
})
