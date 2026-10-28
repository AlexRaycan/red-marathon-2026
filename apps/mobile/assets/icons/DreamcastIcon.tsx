import { COLORS } from '@app/tokens'
import type { ColorValue } from 'react-native'
import Svg, { Circle, Path, Rect, Text } from 'react-native-svg'

export const DreamcastIcon = ({
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
      {/* Circular Controller Frame Head */}
      <Circle
        cx='12'
        cy='12'
        r='9'
        stroke={color}
        strokeWidth='2'
      />
      {/* Integrated VMU Screen Slot */}
      <Rect
        x='10'
        y='5'
        width='4'
        height='3'
        rx='0.5'
        stroke={color}
        strokeWidth='1.2'
      />
      {/* Left Side: Analog Stick */}
      <Circle
        cx='7.5'
        cy='11.5'
        r='1.5'
        stroke={color}
        strokeWidth='1'
      />
      {/* Left Side: D-Pad (Fixed single path, no invalid cy attribute) */}
      <Path
        d='M7.5 14v3M6 15.5h3'
        stroke={color}
        strokeWidth='1'
        strokeLinecap='round'
      />
      {/* Right Side: Diamond Layout Face Buttons */}
      <Circle
        cx='16.5'
        cy='10.5'
        r='0.6'
        fill={color}
      />
      <Text> </Text>
      {/* Y Button */}
      <Circle
        cx='15'
        cy='12'
        r='0.6'
        fill={color}
      />
      <Text> </Text>
      {/* X Button */}
      <Circle
        cx='18'
        cy='12'
        r='0.6'
        fill={color}
      />
      <Text> </Text>
      {/* B Button */}
      <Circle
        cx='16.5'
        cy='13.5'
        r='0.6'
        fill={color}
      />
      <Text> </Text>
      {/* A Button */}
      {/* Center Start Button */}
      <Circle
        cx='12'
        cy='11'
        r='0.5'
        fill={color}
      />
    </Svg>
  )
}
