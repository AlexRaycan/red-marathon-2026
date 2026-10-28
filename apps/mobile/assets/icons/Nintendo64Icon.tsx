import { COLORS } from '@app/tokens'
import type { ColorValue } from 'react-native'
import Svg, { Circle, Path, Text } from 'react-native-svg'

export const Nintendo64Icon = ({
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
      {/* Top Controller Body Shell */}
      <Path
        d='M4 6c0-2 4-3 8-3s8 1 8 3c0 1.5-1 2-2 3H6c-1-1-2-1.5-2-3z'
        stroke={color}
        strokeWidth='2'
        strokeLinejoin='round'
      />
      {/* The Famous 3 Handles (Left, Center, Right Prongs) */}
      <Path
        d='M5 9c-1 3-1 8 1 11s3-1 2-5M12 9v12c0 1.5-.5 1.5-1 1.5s-1 0-1-1.5V9M19 9c1 3 1 8-1 11s-3-1-2-5'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {/* Center Handle Analog Joystick */}
      <Circle
        cx='11'
        cy='12'
        r='1.2'
        stroke={color}
        strokeWidth='1'
      />
      {/* Left Face D-Pad */}
      <Path
        d='M6.5 6.5h1.5M7.25 5.75v1.5'
        stroke={color}
        strokeWidth='0.8'
      />
      {/* Right Face: Independent A/B and C-Button Cluster */}
      <Circle
        cx='15.5'
        cy='7.5'
        r='0.6'
        fill={color}
      />
      <Text> </Text>
      {/* B Button */}
      <Circle
        cx='17'
        cy='7.5'
        r='0.6'
        fill={color}
      />
      <Text> </Text>
      {/* A Button */}
      <Circle
        cx='16.25'
        cy='5.5'
        r='0.4'
        fill={color}
      />
      <Text> </Text>
      {/* C Buttons group indicator */}
    </Svg>
  )
}
