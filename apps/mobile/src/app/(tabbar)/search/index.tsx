import { Stack } from 'expo-router'
import { ScrollView, Text } from 'react-native'

export default function Search() {
  return (
    <>
      <Stack.Title>Search</Stack.Title>
      <Stack.SearchBar
        placement='automatic'
        placeholder='Search'
        onChangeText={() => {}}
      />
      <ScrollView>
        <Text>Items</Text>
      </ScrollView>
    </>
  )
}
