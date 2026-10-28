import { COLORS } from '@app/tokens'
import type { ColorValue } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'

export const WiiRemoteIcon = ({
  size = 24,
  color = COLORS.text.primary
}: {
  size?: number
  color?: ColorValue
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
    >
      {/* Wii Remote Controller Body Outline */}
      <Rect
        x='8'
        y='2'
        width='8'
        height='20'
        rx='1.5'
        stroke={color}
        strokeWidth='2'
      />
      {/* D-Pad representation */}
      <Path
        d='M12 5v4M10 7h4'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      {/* A Button */}
      <Rect
        x='11'
        y='11'
        width='2'
        height='2'
        rx='1'
        fill={color}
      />
      {/* Plus / Minus Buttons */}
      <Path
        d='M10 15h1M13 15h1'
        stroke={color}
        strokeWidth='1'
      />
      {/* 1 & 2 Buttons */}
      <Rect
        x='11'
        y='17'
        width='2'
        height='1'
        rx='0.5'
        fill={color}
      />
      <Rect
        x='11'
        y='19'
        width='2'
        height='1'
        rx='0.5'
        fill={color}
      />
    </Svg>
  )
}
