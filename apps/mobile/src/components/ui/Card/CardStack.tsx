import { COLORS } from '@app/tokens'
import { Image, type ImageProps } from 'expo-image'
import { StyleSheet } from 'react-native'

interface Props extends ImageProps {
  borderRadius?: number
  count?: number
  baseOffset?: number
  direction?: 'top' | 'left' | 'right' | 'bottom'
}

export function CardStack({
  source,
  borderRadius,
  count = 2,
  baseOffset = 16,
  direction = 'left',
  style,
  ...props
}: Props) {
  const offsetMultiplayer = direction === 'left' ? 1 : -1

  return (
    <>
      {Array.from({ length: count }, (_, i) => i).map(i => (
        <Image
          key={`conver-stack-${i}`}
          source={source}
          transition={200}
          contentFit='cover'
          style={[
            StyleSheet.absoluteFill,
            styles.stack,
            {
              borderRadius: borderRadius,
              [direction]: (baseOffset * offsetMultiplayer) / (i + 1),
              transform: [{ scale: 0.9 + i * 0.05 }],
              opacity: 0.25 + i * 0.2
            },
            style
          ]}
          {...props}
        />
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  stack: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.border
  }
})
