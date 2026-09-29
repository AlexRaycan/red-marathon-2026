import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View } from 'react-native'

export function TitleCardBookFX() {
  return (
    <>
      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 0.65)',
          'rgba(255, 255, 255, 0.12)',
          'transparent'
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.spine}
      />
      <View style={styles.pages} />
    </>
  )
}

const styles = StyleSheet.create({
  spine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 10
  },
  pages: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    right: 0,
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.18)'
  }
})
