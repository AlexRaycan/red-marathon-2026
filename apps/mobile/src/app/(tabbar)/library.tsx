import { useLibraryTitlesInfinite, useMyTasteStats } from '@app/api'
import { EMPTY_TEXT, PLACEHOLDER_TEXT } from '@app/constants'
import { useAuth, useDebouncedValue } from '@app/hooks'
import { FONT_SIZE, SPACINGS } from '@app/tokens'
import { type TLibraryStatus } from '@app/types'
import { Redirect } from 'expo-router'
import { LucideLayers } from 'lucide-react-native'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Button, Screen, SearchField, ViewLayout } from '@/components/ui'

import { TitlesGrid, Toolbar } from '@/components/elements'
import { StatusFilter } from '@/components/screens/library'

import { useProtectedPush, useScrollAnimation, useSpaces } from '@/hooks'

const PAGE_SIZE = 9

export default function Library() {
  const [status, setStatus] = useState<TLibraryStatus | null>(null)
  const [search, setSearch] = useState('')

  const { tabbarSpace } = useSpaces()
  const pushProtected = useProtectedPush()

  const { scrollY, scrollHandler } = useScrollAnimation()

  const searchTerm = useDebouncedValue(search.trim())

  const { user, isLoading, isError } = useAuth()

  const { data: tasteStats } = useMyTasteStats({
    query: { enabled: !!user }
  })
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useLibraryTitlesInfinite(
      {
        status: status ? [status] : undefined,
        searchTerm: searchTerm || undefined,
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

  const texts = EMPTY_TEXT.library
  const emptyText = searchTerm ? texts.empty : texts.default

  return (
    <Screen>
      <ViewLayout.Root>
        {/* Add skeleton */}

        <TitlesGrid
          titles={entries}
          getTitle={entry => entry.title}
          keyExtractor={entry => entry.title.key ?? entry.id}
          options={{
            isPending,
            emptyText,
            topPaddingOffset: SPACINGS[16] + SPACINGS[9] + SPACINGS[4],
            bottomPaddingOffset: tabbarSpace
          }}
          onEndReached={onEndReached}
          onScroll={scrollHandler}
        />
      </ViewLayout.Root>

      <Toolbar
        scrollY={scrollY}
        withGradient
        leftSide='Library'
        rightSide={
          <Button
            icon={LucideLayers}
            variant='secondary'
            accessibilityLabel='Collections'
            onPress={() => {
              pushProtected('/collections')
            }}
          />
        }
        titleSize={FONT_SIZE['3xl']}
        gradientLocations={[0.0, 0.8, 1]}
        style={styles.toolbar}
      >
        <SearchField
          value={search}
          placeholder={PLACEHOLDER_TEXT.library}
          onChangeText={setSearch}
        />

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
    gap: SPACINGS[3]
  }
})
