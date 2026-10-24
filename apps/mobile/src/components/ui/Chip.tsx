import { COLORS, FONT_SIZE, RADIUS, SPACINGS } from '@app/tokens'
import hexToRgba from 'hex-to-rgba'
import type { LucideIcon } from 'lucide-react-native'
import { StyleSheet, Text } from 'react-native'

import { Button } from './Button'

interface ChipProps {
  label: string
  icon: LucideIcon
  count?: number
  isActive?: boolean
  withFillIcon?: boolean
  onPress?: () => void
}

export function Chip({
  label,
  icon: Icon,
  count,
  isActive,
  withFillIcon,
  onPress
}: ChipProps) {
  const tintColor = hexToRgba(
    isActive ? COLORS.status.success : COLORS.bg.card,
    1
  )
  const activeStroke = !withFillIcon ? 3 : undefined

  return (
    <Button
      label={label}
      {...(count && { suffics: <Text style={styles.count}>{count}</Text> })}
      icon={Icon}
      variant='secondary'
      tintColor={tintColor}
      contentColor={COLORS.text.primary}
      withFillIcon={isActive && withFillIcon}
      {...(isActive && activeStroke && { strokeWidth: activeStroke })}
      style={[styles.chip]}
      onPress={onPress}
    />
  )
}

const styles = StyleSheet.create({
  chip: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[1],
    paddingRight: SPACINGS[4],
    paddingLeft: SPACINGS[4] - 2,
    borderRadius: RADIUS.full
  },
  count: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.primary,
    opacity: 0.7
  }
})
