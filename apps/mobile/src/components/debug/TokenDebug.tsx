import { ACCESS_TOKEN, REFRESH_TOKEN } from '@app/constants'
import { COLORS, FONT_SIZE, RADIUS, SPACINGS } from '@app/tokens'
import { Button } from '@components/ui/Button'
import { GlassContainer } from '@components/ui/GlassContainer'
import { GlassView } from '@components/ui/GlassView'
import { useQueryClient } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'
import { StyleSheet, Text } from 'react-native'

export function TokenDebug() {
  const queryClient = useQueryClient()

  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  const handleReadTokens = async () => {
    const aToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
    const rToken = await SecureStore.getItemAsync(REFRESH_TOKEN)
    setAccessToken(aToken)
    setRefreshToken(rToken)
  }

  const handleBreakAccessTokens = async () => {
    await SecureStore.setItemAsync(ACCESS_TOKEN, 'broken')
    await queryClient.invalidateQueries()

    await handleReadTokens()
  }

  return (
    <GlassContainer style={styles.root}>
      <GlassView style={styles.content}>
        <Text style={styles.label}>access</Text>
        <Text style={styles.value}>{accessToken}</Text>
      </GlassView>
      <GlassView style={styles.content}>
        <Text style={styles.label}>refresh</Text>
        <Text style={styles.value}>{refreshToken}</Text>
      </GlassView>
      <Button
        label='Read tokens'
        onPress={handleReadTokens}
      />
      <Button
        label='Break access tokens'
        onPress={handleBreakAccessTokens}
      />
    </GlassContainer>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    gap: SPACINGS[3]
  },
  content: {
    padding: SPACINGS[3],
    borderRadius: RADIUS.lg
  },
  label: {
    color: COLORS.text.muted,
    fontSize: FONT_SIZE.xs
  },
  value: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.base
  }
})
