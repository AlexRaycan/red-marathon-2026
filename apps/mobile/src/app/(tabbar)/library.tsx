import { useLibraryTitles } from '@app/api'
import { useAuth } from '@app/hooks'
import { FONT_SIZE } from '@app/tokens'
import { type TLibraryStatus } from '@app/types'
import { Redirect } from 'expo-router'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Screen } from '@/components/ui'

import { TitlesGrid, Toolbar } from '@/components/elements'
import { StatusFilter } from '@/components/pages/library'

export default function Library() {
  const { user, isLoading, isError } = useAuth()
  const [status, setStatus] = useState<TLibraryStatus | null>(null)

  const { data, isPending } = useLibraryTitles(
    {
      status: status ? [status] : undefined,
      take: 27
    },
    {
      query: { enabled: !!user }
    }
  )

  if (isLoading) return <Screen />

  if (isError || !user) return <Redirect href={'/login'} />

  const entries = data?.status === 200 ? data.data.items : []

  return (
    <Screen>
      <Toolbar
        leftSide='Library'
        withHorPaddings
        titleSize={FONT_SIZE['3xl']}
      />

      <StatusFilter
        value={status}
        onChange={setStatus}
      />

      <TitlesGrid
        titles={entries}
        isPending={isPending}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})
