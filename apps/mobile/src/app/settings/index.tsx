import { MenuItem, Screen, ViewLayout } from '@/components/ui'

import { Toolbar } from '@/components/elements'
import { DeleteAccount } from '@/components/pages/settings'

export default function Settings() {
  return (
    <Screen withPaddings>
      <Toolbar
        leftSide='Settings'
        isBackButton
      />

      <ViewLayout.Root withToolbar>
        <ViewLayout.Root>
          <MenuItem label='Change username' />
        </ViewLayout.Root>

        <ViewLayout.Footer style={{ opacity: 0.7 }}>
          <DeleteAccount />
        </ViewLayout.Footer>
      </ViewLayout.Root>
    </Screen>
  )
}
