import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACINGS } from '@app/tokens'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Screen, ViewLayout } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import { SUBSCRIPTIONS, SubscriptionCard } from '@/components/subscriptions'

const CARD_PEEK = SPACINGS[4]

export default function Plans() {
  const { width } = useWindowDimensions()
  const { top } = useSafeAreaInsets()

  const cardWidth = width - CARD_PEEK * 2

  return (
    <Screen isInfitinyMode>
      <Toolbar
        isAbsolute
        isCloseButton
      />

      <ViewLayout.Root>
        <View style={[styles.content, { paddingTop: top + SPACINGS[16] }]}>
          <Text style={styles.title}>Choose your own plan</Text>

          <ScrollView
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
          </ScrollView>
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
  carousel: {
    flexGrow: 0
  },
  title: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['2xl'],
    fontWeight: FONT_WEIGHT.bold,
    textAlign: 'center'
  },
  cards: {
    alignItems: 'flex-start',
    gap: SPACINGS[3],
    paddingHorizontal: CARD_PEEK
  }
})
