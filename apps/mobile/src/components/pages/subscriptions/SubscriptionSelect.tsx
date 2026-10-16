import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import type { ISubscription } from '@app/types'
import hexToRgba from 'hex-to-rgba'
import { StyleSheet, Text, View } from 'react-native'

import { Button, RadioButton } from '../../ui'

interface SubscriptionSelectProps {
  subscription: ISubscription
  isSelected: boolean
  onPress: () => void
}

export function SubscriptionSelect({
  subscription,
  isSelected,
  ...props
}: SubscriptionSelectProps) {
  return (
    <Button
      size='lg'
      variant='secondary'
      tintColor={
        isSelected ? hexToRgba(COLORS.status.success, 0.3) : 'transparent'
      }
      style={styles.subButton}
      {...props}
    >
      <View style={styles.subButtonContent}>
        <RadioButton isSelected={isSelected} />

        <View style={styles.subLabel}>
          <Text style={[styles.baseText, styles.textAccent, styles.subName]}>
            {subscription.name}
          </Text>
          <Text style={[styles.baseText, styles.subtituteText, styles.trial]}>
            {subscription.trialPeriod}
          </Text>
        </View>

        <View style={styles.price}>
          <Text
            style={[styles.baseText, styles.textAccent, styles.priceAmount]}
          >
            {subscription.price}
          </Text>
          <Text
            style={[styles.baseText, styles.subtituteText, styles.pricePeriod]}
          >
            {'/'}
            {subscription.period}
          </Text>
        </View>
      </View>
    </Button>
  )
}
const styles = StyleSheet.create({
  baseText: { color: COLORS.text.primary },
  subtituteText: { color: COLORS.text.primary, opacity: 0.65 },
  textAccent: {
    fontWeight: FONT_WEIGHT.bold
  },
  subButton: { height: 'auto', paddingVertical: SPACINGS[5] },
  subButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACINGS[3]
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
  pricePeriod: { fontSize: FONT_SIZE.xs }
})
