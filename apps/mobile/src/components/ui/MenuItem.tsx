import { COLORS, FONT_SIZE, FONT_WEIGHT, LAYOUT, SPACINGS } from '@app/tokens'
import hexToRgba from 'hex-to-rgba'
import { ChevronRightIcon, type LucideIcon } from 'lucide-react-native'
import type { ReactNode } from 'react'
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  Text,
  View
} from 'react-native'

interface MenuItemProps extends PressableProps {
  label: string
  icon?: LucideIcon
  withChevron?: boolean
  children?: ReactNode
}

export function MenuItem({
  label,
  icon: Icon,
  withChevron,
  children,
  ...props
}: MenuItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
      {...props}
    >
      <View style={styles.content}>
        {Icon && (
          <Icon
            size={22}
            color={COLORS.text.primary}
          />
        )}
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.content}>
        {children}
        {withChevron && (
          <ChevronRightIcon
            size={22}
            color={COLORS.text.muted}
          />
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: LAYOUT['space-horizontal'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACINGS[5],
    borderBottomColor: hexToRgba(COLORS.primary, 0.1),
    borderBottomWidth: 1
  },
  pressed: {
    backgroundColor: COLORS.bg.card
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[3]
  },
  label: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold
  },
  suffix: {}
})
