import { FONT_SIZE } from '@app/tokens'
import { StyleSheet } from 'react-native'

import { Screen, ViewLayout } from '@/components/ui'

import { Toolbar } from '@/components/elements'

export default function CollectionDetailsPage() {
  return (
    <Screen>
      <Toolbar
        leftSide='Collections 1'
        withGradient
        titleSize={FONT_SIZE['3xl']}
        isBackButton
      />
      <ViewLayout.Root></ViewLayout.Root>
    </Screen>
  )
}

const styles = StyleSheet.create({})
