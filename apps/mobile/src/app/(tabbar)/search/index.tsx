import { Stack } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'

export default function Search() {
  return (
    <View>
      <Stack.Title>Search</Stack.Title>
      <Stack.SearchBar
        placement='automatic'
        placeholder='Search'
        onChangeText={() => {}}
      />
      <ScrollView>
        <Text>Items</Text>
      </ScrollView>

      {/*
        Header
          Left side: Logo (naming)
          Right side: Bell (notifications)

        Slider (contuner "watching")
          Buttons: Read More, Plus (to add to watchlist)

        Top Picks for You (Carousel)

        Popular (Carousel)
      */}
    </View>
  )
}
