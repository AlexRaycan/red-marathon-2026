import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import { ChevronRight } from 'lucide-react-native'
import type { PropsWithChildren } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

interface Props extends PropsWithChildren {
  title: string
  onPress?: () => void
}

export function Carousel({ title, children, onPress }: Props) {
  return (
    <View style={styles.root}>
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        hitSlop={12}
        style={styles.header}
      >
        <Text style={styles.title}>{title}</Text>
        {Boolean(onPress) && (
          <ChevronRight
            size={22}
            color={COLORS.text.primary}
          />
        )}
      </Pressable>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: SPACINGS[3]
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: LAYOUT['space-horizontal'],
    paddingVertical: SPACINGS[2]
  },
  title: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold
  },
  scroll: {
    gap: SPACINGS[3],
    paddingHorizontal: LAYOUT['space-horizontal']
  }
})
