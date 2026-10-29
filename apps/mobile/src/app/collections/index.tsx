import { FONT_SIZE } from '@app/tokens'
import { StyleSheet } from 'react-native'

import { Screen, ViewLayout } from '@/components/ui'

import { Toolbar } from '@/components/elements'

export default function CollectionsPage() {
  return (
    <Screen>
      <Toolbar
        leftSide='Collections'
        withGradient
        titleSize={FONT_SIZE['3xl']}
        isBackButton
      />
      <ViewLayout.Root></ViewLayout.Root>
    </Screen>
  )
}

const styles = StyleSheet.create({})
