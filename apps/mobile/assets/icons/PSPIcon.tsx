import { COLORS } from '@app/tokens'
import type { ColorValue } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'

export const PSPIcon = ({
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
      {/* Handheld Main Body */}
      <Rect
        x='2'
        y='5'
        width='20'
        height='14'
        rx='4'
        stroke={color}
        strokeWidth='2'
      />

      {/* Screen Outline */}
      <Rect
        x='6'
        y='7'
        width='12'
        height='10'
        rx='0.5'
        stroke={color}
        strokeWidth='1.5'
      />

      {/* Left Side: D-Pad */}
      <Path
        d='M4 10h1.5M4.75 9.25v1.5'
        stroke={color}
        strokeWidth='1'
        strokeLinecap='round'
      />
      {/* Left Side: Analog Nub */}
      <Circle
        cx='4.75'
        cy='13.5'
        r='0.75'
        fill={color}
      />

      {/* Right Side: Action Buttons */}
      <Circle
        cx='19.25'
        cy='10'
        r='0.5'
        fill={color}
      />
      <Circle
        cx='19.25'
        cy='12'
        r='0.5'
        fill={color}
      />
      <Circle
        cx='18.25'
        cy='11'
        r='0.5'
        fill={color}
      />
      <Circle
        cx='20.25'
        cy='11'
        r='0.5'
        fill={color}
      />

      {/* Bottom Utility Bar */}
      <Path
        d='M8 18h8'
        stroke={color}
        strokeWidth='1'
        strokeLinecap='round'
      />
    </Svg>
  )
}
