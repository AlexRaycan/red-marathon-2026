import { useLibraryTitlesInfinite, useMyTasteStats } from '@app/api'
import { useAuth } from '@app/hooks'
import { FONT_SIZE, SPACINGS } from '@app/tokens'
import { type TLibraryStatus } from '@app/types'
import { Redirect } from 'expo-router'
import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Screen } from '@/components/ui'

import { ProgressiveBlur, TitlesGrid, Toolbar } from '@/components/elements'
import { StatusFilter } from '@/components/pages/library'

const PAGE_SIZE = 9

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
      <ProgressiveBlur.Target ref={blurTargetRef}>
        <TitlesGrid
          titles={entries}
          isPending={isPending}
          style={{ paddingTop: inset.top * 2 + SPACINGS[9] + SPACINGS[4] }}
          onEndReached={onEndReached}
        />
      </ProgressiveBlur.Target>

      <View style={[styles.header, { paddingTop: inset.top * 2 }]}>
        <ProgressiveBlur.Blur ref={blurTargetRef} />

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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
})
