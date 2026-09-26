import { Toolbar } from '@/components/toolbar/Toolbar'
import { MenuItem } from '@/components/ui/MenuItem'
import { Screen } from '@/components/ui/Screen'
import { ViewLayout } from '@/components/ui/ViewLayout'

export default function Settings() {
  return (
    <Screen isInfitinyMode>
      <Toolbar
        leftSide='Settings'
        isBackButton
        isAbsolute
      />
      <ViewLayout.Root
        isInfinity
        withToolbar
      >
        <ViewLayout.Root>
          <MenuItem label='Change username' />
        </ViewLayout.Root>
      </ViewLayout.Root>
    </Screen>
  )
}
