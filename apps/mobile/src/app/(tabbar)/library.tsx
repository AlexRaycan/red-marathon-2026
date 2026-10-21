import { useLibraryTitlesInfinite, useMyTasteStats } from '@app/api'
import { useAuth } from '@app/hooks'
import { FONT_SIZE, SPACINGS } from '@app/tokens'
import { type TLibraryStatus } from '@app/types'
import MaskedView from '@react-native-masked-view/masked-view'
import { BlurTargetView, BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { Redirect } from 'expo-router'
import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Screen } from '@/components/ui'

import { TitlesGrid, Toolbar } from '@/components/elements'
import { StatusFilter } from '@/components/pages/library'

const PAGE_SIZE = 9
const BLUR_FADE_HEIGHT = 64

export default function Library() {
  const [status, setStatus] = useState<TLibraryStatus | null>(null)
  const blurTargetRef = useRef<View | null>(null)
  const inset = useSafeAreaInsets()

  const { user, isLoading, isError } = useAuth()

  const { data: tasteStats } = useMyTasteStats({
    query: { enabled: !!user }
  })
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useLibraryTitlesInfinite(
      {
        status: status ? [status] : undefined,
        take: PAGE_SIZE
      },
      {
        query: {
          enabled: !!user,
          initialPageParam: 0,
          getNextPageParam: (lastPage, allPages) =>
            lastPage.data.isHasMore ? allPages.length * PAGE_SIZE : undefined
        }
      }
    )

  if (isLoading) return <Screen />

  if (isError || !user) return <Redirect href={'/login'} />

  const entries = data?.pages.flatMap(page => page.data.items) ?? []

  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }

  return (
    <Screen
      isInfitinyMode
      withExtraMarginTop={false}
    >
      <BlurTargetView
        ref={blurTargetRef}
        style={styles.blurTarget}
      >
        <TitlesGrid
          titles={entries}
          isPending={isPending}
          style={{ paddingTop: inset.top * 2 + SPACINGS[9] + SPACINGS[4] }}
          onEndReached={onEndReached}
        />
      </BlurTargetView>

      <View style={[styles.header, { paddingTop: inset.top * 2 }]}>
        <MaskedView
          pointerEvents='none'
          style={[StyleSheet.absoluteFill, styles.blurBackground]}
          maskElement={
            <View style={styles.blurMask}>
              <View style={styles.blurMaskSolid} />
              <LinearGradient
                colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.blurMaskFade}
              />
            </View>
          }
        >
          <BlurView
            blurTarget={blurTargetRef}
            blurMethod='dimezisBlurView'
            intensity={60}
            tint='systemChromeMaterialDark'
            style={StyleSheet.absoluteFill}
          />
        </MaskedView>

        <Toolbar
          leftSide='Library'
          withHorPaddings
          titleSize={FONT_SIZE['3xl']}
        />

        <StatusFilter
          value={status}
          onChange={setStatus}
          counts={tasteStats?.data.byStatus ?? {}}
          total={tasteStats?.data.totalEntries ?? 0}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  blurTarget: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  blurBackground: {
    bottom: -BLUR_FADE_HEIGHT / 2
  },
  blurMask: {
    flex: 1
  },
  blurMaskSolid: {
    flex: 1,
    backgroundColor: 'black'
  },
  blurMaskFade: {
    height: BLUR_FADE_HEIGHT
  }
})
