import type { CollectionListItemResponse } from '@app/api'
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACINGS } from '@app/tokens'
import { Image } from 'expo-image'
import { Check } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { AnimatedPressable } from '@/components/ui'

interface CollectionRowProps {
  collection: CollectionListItemResponse
  isSelected: boolean
  onPress: () => void
}

export function CollectionRow({
  collection,
  isSelected,
  onPress
}: CollectionRowProps) {
  const { name, previewCovers } = collection
  return (
    <AnimatedPressable
      accessibilityRole='checkbox'
      accessibilityState={{ checked: isSelected }}
      style={styles.root}
    >
      <Image
        source={previewCovers}
        contentFit='cover'
        style={styles.cover}
      />

      <View style={styles.labelContainer}>
        <Text
          numberOfLines={1}
          style={styles.label}
        >
          {name}
        </Text>
      </View>

      {isSelected && (
        <Check
          size={22}
          color={COLORS.text.primary}
        />
      )}
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  root: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[2]
  },
  cover: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.bg.card
  },
  labelContainer: {
    flex: 1,
    gap: SPACINGS[1]
  },
  label: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.medium
  }
})
