import { Toolbar } from '@/components/toolbar'
import { MenuItem, Screen, ViewLayout } from '@/components/ui'

export default function Subscription() {
  return (
    <Screen isInfitinyMode>
      <Toolbar
        leftSide='Subscription'
        isBackButton
        isAbsolute
      />
      <ViewLayout.Root
        isInfinity
        withToolbar
      >
        <ViewLayout.Root>
          <MenuItem label='Buy subscription' />
        </ViewLayout.Root>
      </ViewLayout.Root>
    </Screen>
  )
}
