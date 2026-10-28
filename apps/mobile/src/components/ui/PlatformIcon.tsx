import { type Platform } from '@app/constants'
import { COLORS } from '@app/tokens'
import {
  faAndroid,
  faAppStore,
  faApple,
  faLinux,
  faPlaystation,
  faWindows,
  faXbox
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { NintendoSwitchIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { Gamepad2 } from 'lucide-react-native'
import type { ComponentType } from 'react'

import {
  DreamcastIcon,
  GameCubeIcon,
  Nintendo64Icon,
  PSPIcon,
  WiiRemoteIcon
} from '@/assets/icons'

interface PlatformIconProps {
  platform: Platform
  color?: string
  size?: number
}

const ICONS: Record<
  Platform,
  ComponentType<{ color?: string; size?: number }>
> = {
  iOS: ({ color, size }) => (
    <FontAwesomeIcon
      icon={faAppStore}
      style={{ color }}
      size={size}
    />
  ),
  Android: ({ color, size }) => (
    <FontAwesomeIcon
      icon={faAndroid}
      style={{ color }}
      size={size}
    />
  ),
  macOS: ({ color, size }) => (
    <FontAwesomeIcon
      icon={faApple}
      style={{ color }}
      size={size}
    />
  ),
  Linux: ({ color, size }) => (
    <FontAwesomeIcon
      icon={faLinux}
      style={{ color }}
      size={size}
    />
  ),
  PC: ({ color, size }) => (
    <FontAwesomeIcon
      icon={faWindows}
      style={{ color }}
      size={size}
    />
  ),
  'Xbox One': ({ color, size }) => (
    <FontAwesomeIcon
      icon={faXbox}
      style={{ color }}
      size={size}
    />
  ),
  'Xbox Series S/X': ({ color, size }) => (
    <FontAwesomeIcon
      icon={faXbox}
      style={{ color }}
      size={size}
    />
  ),
  'PlayStation 4': ({ color, size }) => (
    <FontAwesomeIcon
      icon={faPlaystation}
      style={{ color }}
      size={size}
    />
  ),
  'PlayStation 5': ({ color, size }) => (
    <FontAwesomeIcon
      icon={faPlaystation}
      style={{ color }}
      size={size}
    />
  ),
  PSP: ({ color, size }) => (
    <PSPIcon
      color={color}
      size={size}
    />
  ),
  'Nintendo Switch': ({ color, size }) => (
    <HugeiconsIcon
      icon={NintendoSwitchIcon}
      color={color}
      size={size}
    />
  ),
  'Nintendo 64': ({ color, size }) => (
    <Nintendo64Icon
      color={color}
      size={size}
    />
  ),
  'Nintendo DS': ({ color, size }) => (
    <PSPIcon
      color={color}
      size={size}
    />
  ),
  Wii: ({ color, size }) => (
    <WiiRemoteIcon
      color={color}
      size={size}
    />
  ),
  Dreamcast: ({ color, size }) => (
    <DreamcastIcon
      color={color}
      size={size}
    />
  ),
  GameCube: ({ color, size }) => (
    <GameCubeIcon
      color={color}
      size={size}
    />
  )
}

export function PlatformIcon({ platform, color, size }: PlatformIconProps) {
  const Icon = ICONS?.[platform] ?? Gamepad2

  if (!ICONS?.[platform]) console.log('Platform:', platform)

  return (
    <Icon
      color={color ?? COLORS.text.primary}
      size={size}
    />
  )
}
