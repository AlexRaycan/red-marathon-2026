import { COLORS } from '@app/tokens'
import type { ColorValue } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'

export const GameCubeIcon = ({
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
      {/* Back Carrying Handle */}
      <Path
        d='M7 5V3c0-0.5 0.5-1 1-1h8c0.5 0 1 0.5 1 1v2'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
      />

      {/* Main Cube Console Body */}
      <Rect
        x='4'
        y='5'
        width='16'
        height='15'
        rx='2'
        stroke={color}
        strokeWidth='2'
      />

      {/* Top Disc Lid Circle Line */}
      <Path
        d='M7 5c0 1.5 2.2 2.5 5 2.5s5-1 5-2.5'
        stroke={color}
        strokeWidth='1.2'
      />

      {/* Front Faceplate (Controller Port Area) */}
      <Rect
        x='6'
        y='9'
        width='12'
        height='9'
        rx='1'
        stroke={color}
        strokeWidth='1.5'
      />

      {/* Controller Ports (4 small round circles) */}
      <Circle
        cx='8.5'
        cy='11.5'
        r='0.75'
        fill={color}
      />
      <Circle
        cx='11'
        cy='11.5'
        r='0.75'
        fill={color}
      />
      <Circle
        cx='13.5'
        cy='11.5'
        r='0.75'
        fill={color}
      />
      <Circle
        cx='16.0'
        cy='11.5'
        r='0.75'
        fill={color}
      />

      {/* Memory Card Slots & Power LED Indicator */}
      <Rect
        x='8'
        y='14.5'
        width='2'
        height='1'
        rx='0.2'
        fill={color}
      />
      <Rect
        x='11'
        y='14.5'
        width='2'
        height='1'
        rx='0.2'
        fill={color}
      />
      <Circle
        cx='15'
        cy='15'
        r='0.5'
        fill={color}
      />
    </Svg>
  )
}
