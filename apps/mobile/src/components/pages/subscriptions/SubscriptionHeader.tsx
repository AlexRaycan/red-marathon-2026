import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import { StyleSheet, Text, View } from 'react-native'

export function SubscriptionHeader() {
  return (
    <View style={styles.header}>
      <Text style={[styles.baseText, styles.title]}>
        <Text style={styles.textAccent}>Get Access</Text>
        <Text style={styles.subtituteText}> With SagaSet&nbsp;</Text>
        <Text style={styles.textAccent}>Premium</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: SPACINGS[4],
    paddingBottom: SPACINGS[16]
  },
  baseText: { color: COLORS.text.primary },
  subtituteText: { color: COLORS.text.primary, opacity: 0.65 },
  title: {
    fontSize: FONT_SIZE.giant,
    fontWeight: FONT_WEIGHT.light,
    textAlign: 'center'
  },
  textAccent: {
    fontWeight: FONT_WEIGHT.bold
  }
})
