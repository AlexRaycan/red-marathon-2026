import { useLibraryTitlesInfinite, useMyTasteStats } from '@app/api'
import { useAuth } from '@app/hooks'
import { FONT_SIZE, SPACINGS } from '@app/tokens'
import { type TLibraryStatus } from '@app/types'
import { Redirect } from 'expo-router'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Screen, ViewLayout } from '@/components/ui'

import { TitlesGrid, Toolbar } from '@/components/elements'
import { StatusFilter } from '@/components/pages/library'

import { useScrollAnimation, useSpaces } from '@/hooks'

const PAGE_SIZE = 9

export default function Library() {
  const [status, setStatus] = useState<TLibraryStatus | null>(null)
  const { toolbarSpace } = useSpaces()

  const { scrollY, scrollHandler } = useScrollAnimation()

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
    <Screen>
      <ViewLayout.Root>
        <TitlesGrid
          titles={entries}
          isPending={isPending}
          style={{ paddingTop: toolbarSpace + SPACINGS[9] + SPACINGS[4] }}
          onEndReached={onEndReached}
          onScroll={scrollHandler}
        />
      </ViewLayout.Root>

      <Toolbar
        scrollY={scrollY}
        withGradient
        leftSide='Library'
        titleSize={FONT_SIZE['3xl']}
        gradientLocations={[0.0, 0.8, 1]}
        style={styles.toolbar}
      >
        <StatusFilter
          value={status}
          onChange={setStatus}
          counts={tasteStats?.data.byStatus ?? {}}
          total={tasteStats?.data.totalEntries ?? 0}
        />
      </Toolbar>
    </Screen>
  )
}

const styles = StyleSheet.create({
  toolbar: {
    gap: SPACINGS[4]
  }
})
