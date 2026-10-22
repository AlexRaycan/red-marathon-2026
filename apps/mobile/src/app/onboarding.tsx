import { useTrendingTitles } from '@app/api'
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  LAYOUT,
  RADIUS,
  SPACINGS
} from '@app/tokens'
import { router } from 'expo-router'
import { Sparkles } from 'lucide-react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Screen, ViewLayout } from '@/components/ui'

import { PosterWall } from '@/components/pages/onboarding'

import { useOnboardingStore } from '@/store'

export default function Onboarding() {
  const { data } = useTrendingTitles({ take: 24 })
  const completeOnboarding = useOnboardingStore(
    state => state.completeOnboarding
  )

  const coverUrls = (data?.data ?? []).flatMap(({ coverUrl }) =>
    coverUrl ? [coverUrl] : []
  )

  const onGetStarted = async (route: 'login' | 'register') => {
    await completeOnboarding()
    router.push(`/${route}`)
  }

  return (
    <ViewLayout.Root hasBGColor>
      <PosterWall coverUrls={coverUrls} />

      <Screen
        edges={['bottom']}
        hasBGColor={false}
        style={styles.content}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Sparkles
              size={32}
              color={COLORS.text.primary}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Track Everything You Love</Text>
            <Text style={styles.desc}>
              Movies, series, anime, books, and games in one place. Rate what
              you finish and discover your Taste DNA
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            label='Get Started'
            size='lg'
            tintColor={COLORS.status.success}
            onPress={() => onGetStarted('register')}
          />

          <Button
            label='Explore First'
            size='lg'
            variant='secondary'
            onPress={completeOnboarding}
          />

          <Pressable
            hitSlop={12}
            onPress={() => onGetStarted('login')}
            style={styles.footer}
          >
            <Text style={styles.login}>
              Already have an account?{' '}
              <Text style={styles.loginAccent}>Log In</Text>
            </Text>
          </Pressable>
        </View>
      </Screen>
    </ViewLayout.Root>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    gap: SPACINGS[6],
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  logoContainer: {
    gap: SPACINGS[4]
  },
  logo: {
    alignSelf: 'center',
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.status.success
  },
  titleContainer: {
    gap: SPACINGS[2]
  },
  title: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE['3xl'],
    fontWeight: FONT_WEIGHT.bold,
    textAlign: 'center'
  },
  desc: {
    color: COLORS.text['little-muted'],
    fontSize: FONT_SIZE.sm,
    textAlign: 'center'
  },
  actions: {
    gap: SPACINGS[3]
  },
  footer: {
    paddingTop: SPACINGS[3]
  },
  login: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center'
  },
  loginAccent: {
    fontWeight: FONT_WEIGHT.semibold,
    textDecorationLine: 'underline'
  }
})
