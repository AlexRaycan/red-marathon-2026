import type { TitleListItemResponseType } from '@app/api/src/generated/model'
import { RADIUS } from '@app/tokens'
import {
  BookOpen,
  Film,
  Gamepad2,
  type LucideIcon,
  Sparkle,
  Tv
} from 'lucide-react-native'

interface ICardConfig {
  width: number
  height: number
  radius: number
  icon: LucideIcon
  accent: string
  stacked?: boolean
  spine?: boolean
  glow?: string
}

export const CARD_CONFIG: Record<TitleListItemResponseType, ICardConfig> = {
  MOVIE: {
    width: 132,
    height: 198,
    radius: RADIUS.md,
    icon: Film,
    accent: 'rgba(255, 0, 0, 0.38)'
  },
  TV_SHOW: {
    width: 132,
    height: 198,
    radius: RADIUS.md,
    icon: Tv,
    stacked: true,
    accent: 'rgba(0, 255, 0, 0.38)'
  },
  GAME: {
    width: 132,
    height: 198,
    radius: RADIUS.md,
    icon: Gamepad2,
    accent: 'rgba(0, 0, 255, 0.38)'
  },
  BOOK: {
    width: 132,
    height: 198,
    radius: RADIUS.sm,
    icon: BookOpen,
    spine: true,
    accent: 'rgba(255, 255, 0, 0.38)'
  },
  ANIME: {
    width: 132,
    height: 198,
    radius: RADIUS.md,
    icon: Sparkle,
    accent: 'rgba(129, 65, 248, 0.38)',
    glow: 'rgba(129, 65, 248, 0.6)'
  }
}
