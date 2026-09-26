import { Toolbar } from '@/components/toolbar/Toolbar'
import { MenuItem } from '@/components/ui/MenuItem'
import { Screen } from '@/components/ui/Screen'
import { ViewLayout } from '@/components/ui/ViewLayout'

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
