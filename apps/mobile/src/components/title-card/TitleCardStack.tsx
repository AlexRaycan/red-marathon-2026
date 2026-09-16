import { COLORS } from '@app/tokens'
import { Image, type ImageProps } from 'expo-image'
import { StyleSheet } from 'react-native'

interface Props extends ImageProps {
  borderRadius?: number
}

export function TitleCardStack({
  source,
  borderRadius,
  style,
  ...props
}: Props) {
  return (
    <>
      <Image
        source={source}
        transition={200}
        contentFit='cover'
        style={[
          StyleSheet.absoluteFill,
          style,
          styles.stack,
          {
            borderRadius: borderRadius,
            left: 16,
            transform: [{ scale: 0.9 }],
            opacity: 0.25
          }
        ]}
        {...props}
      />
      <Image
        source={source}
        transition={200}
        contentFit='cover'
        style={[
          StyleSheet.absoluteFill,
          style,
          styles.stack,
          {
            borderRadius: borderRadius,
            left: 8,
            transform: [{ scale: 0.95 }],
            opacity: 0.45
          }
        ]}
        {...props}
      />
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
