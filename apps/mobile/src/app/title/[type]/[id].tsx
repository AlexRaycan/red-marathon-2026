import { router, useLocalSearchParams } from 'expo-router'
import { Pressable, Text } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Toolbar } from '@/components/ui/Toolbar'

export default function ItemDetailScreen() {
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>()
  return (
    <Screen>
      <Toolbar
        leftSide={
          <Text>
            Item Detail {type} - {id}
          </Text>
        }
        isBackButton
        onPress={() => router.back()}
      />
      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>

      {/*
        Header:
          Left side: Back button

        Backdrop image
        Title

        Met line
          age, year, duration, genre...

          Descrioption + AI summary btn no spoilers

          Primary button
            none     → [ + Add to Library]
            want     → [ Start ]
            progress → [ Mark as Done ]
            done    → [ Reset Progress ]
            LONG PRESS
              opens full list of actions
              dropped  → [ Dropped ] - remove from library

            Details
              Cast / Director / Author / Developer / Studio - depends on type

            Actions
              Add to `Watchlist`, add to colllection, to share...


            Similar titles (Carousel)

            Reviews (possible add review button)


        */}
    </Screen>
  )
}
