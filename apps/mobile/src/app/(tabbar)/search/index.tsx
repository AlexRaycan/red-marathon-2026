import { useSearchTitles } from '@app/api'
import { EMPTY_TEXT, MIN_QUERY_LENGTH } from '@app/constants'
import { useDebouncedValue } from '@app/hooks'
import { FONT_SIZE, SPACINGS } from '@app/tokens'
import type { TTitleType } from '@app/types'
import { Stack } from 'expo-router'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Screen, ViewLayout } from '@/components/ui'

import { TitlesGrid, Toolbar } from '@/components/elements'
import { TypeFilter } from '@/components/pages/search'

import { useScrollAnimation, useSpaces } from '@/hooks'

export default function Search() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<TTitleType | null>()

  const debouncedQuery = useDebouncedValue(query.trim())

  const { toolbarSpace } = useSpaces()

  const { scrollY, scrollHandler } = useScrollAnimation()

  const isQueryValid = debouncedQuery.length >= MIN_QUERY_LENGTH

  const { data, isFetching } = useSearchTitles(
    {
      q: debouncedQuery,
      type: type ? [type] : undefined
    },
    {
      query: { enabled: isQueryValid }
    }
  )

  const results = isQueryValid && data?.status === 200 ? data.data : []

  const texts = EMPTY_TEXT.search
  const emptyText = !isQueryValid
    ? texts.default
    : isFetching
      ? texts.process
      : texts.empty

  return (
    <Screen>
      <Stack.Title>Search</Stack.Title>
      <Stack.SearchBar
        placement='automatic'
        placeholder='Search titles'
        onChangeText={event => setQuery(event.nativeEvent.text)}
      />

      <ViewLayout.Root>
        {/* Add skeleton */}
        <TitlesGrid
          titles={results}
          getTitle={title => title}
          keyExtractor={title => title.key}
          emptyText={emptyText}
          isPending={isFetching}
          style={{ paddingTop: toolbarSpace }}
          onScroll={scrollHandler}
        />
      </ViewLayout.Root>

      <Toolbar
        scrollY={scrollY}
        withGradient
        leftSide='Search'
        titleSize={FONT_SIZE['3xl']}
        gradientLocations={[0.0, 0.8, 1]}
        style={styles.toolbar}
      >
        <TypeFilter
          value={type ?? null}
          onChange={setType}
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
