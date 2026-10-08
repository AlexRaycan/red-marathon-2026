import { LAYOUT, SPACINGS } from '@app/tokens'
import { Bookmark, Star } from 'lucide-react-native'
import { type ColorValue, StyleSheet, View } from 'react-native'

import { Button, GlassContainer } from '@/components/ui'

import { LibraryStatusButton } from '@/components/pages/details'

interface DetailsActionButtonsProps {
  titleKey: string
  accentColor?: ColorValue
}

export function DetailsActionButtons({
  titleKey,
  accentColor
}: DetailsActionButtonsProps) {
  return (
    <GlassContainer>
      <View style={[styles.baseContainer, styles.actionButtonContainer]}>
        <LibraryStatusButton
          titleKey={titleKey}
          tintColor={accentColor}
        />
        <View style={[styles.actionButtonGroup]}>
          <Button
            label='Add to Watchlist'
            variant='secondary'
            icon={Bookmark}
            fullWidth
            onPress={() => console.log('Pressed Add to Watchlist')}
          />

          {/* TODO: long press let user quick rate; press to show clickable pop-up */}
          <Button
            label='Rate'
            variant='secondary'
            icon={Star}
            fullWidth
            onPress={() => console.log('Pressed Rate')}
          />
        </View>
      </View>
    </GlassContainer>
  )
}

const styles = StyleSheet.create({
  baseContainer: {
    marginHorizontal: LAYOUT['space-horizontal']
  },
  actionButtonContainer: {
    gap: SPACINGS[4]
  },
  actionButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACINGS[3]
  }
})
