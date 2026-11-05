import { useAuth } from '@app/hooks'
import { Icon } from '@expo/ui'
import MenuView from '@expo/ui/community/menu'
import type { PropsWithChildren } from 'react'
import { Alert } from 'react-native'

const removeIcon = Icon.select({
  ios: 'trash',
  android: import('@expo/material-symbols/delete.xml')
})

interface TitleCardLongPressProps extends PropsWithChildren {
  place?: string
  titleName?: string
  isAddedToLibrary?: boolean
  onRemove: () => void
  onLongPress?: () => void
}

export function TitleCardLongPress({
  place = 'library',
  titleName = 'title',
  isAddedToLibrary,
  children,
  onRemove,
  onLongPress
}: TitleCardLongPressProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated || !isAddedToLibrary) return children

  const handleLongPress = () => {
    if (isAuthenticated) {
      Alert.alert(
        `Remove ${titleName} from the ${place}?`,
        'Action is undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => onRemove()
          }
        ]
      )
    }

    onLongPress?.()
  }

  return (
    <MenuView
      shouldOpenOnLongPress
      actions={[
        {
          id: 'remove',
          title: `Remove from the ${place}`,
          image: removeIcon,
          attributes: { destructive: true }
        }
      ]}
      onPressAction={handleLongPress}
    >
      {children}
    </MenuView>
  )
}
