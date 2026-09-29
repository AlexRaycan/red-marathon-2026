import { Toolbar } from '@/components/toolbar'
import { MenuItem, Screen, ViewLayout } from '@/components/ui'

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
