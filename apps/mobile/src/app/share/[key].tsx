import { useDiscoverFindByKey } from '@app/api'
import { COLORS, LAYOUT, RADIUS, SPACINGS } from '@app/tokens'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {
  Button,
  GlassContainer,
  Input,
  Screen,
  ScreenTitle
} from '@/components/ui'

import { Carousel } from '@/components/carousel'
import { FriendCard } from '@/components/pages/details/share/FriendCard'
import { SHARE_FRIENDS_MOCK_DATA } from '@/components/pages/details/share/share-friends.mock.data'

export default function ShareScreen() {
  const { key } = useLocalSearchParams<{ key: string }>()
  const { data, isPending } = useDiscoverFindByKey(key)

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // TODO refactor
  const title = data?.status === 200 ? data.data : null

  if (isPending || !title) return <Screen />

  const titleName = title.name
  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null
  const coverUrl = title.coverUrl

  const heading = `${titleName}${year ? ` (${year})` : ''}`

  const toggleFriends = (id: string) => {
    setSelectedIds(ids =>
      ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]
    )
  }

  const recipients = SHARE_FRIENDS_MOCK_DATA.filter(friend =>
    selectedIds.includes(friend.id)
  )
    .map(friend => friend.name)
    .join(', ')

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <View style={[styles.title]}>
          <ScreenTitle style={[styles.inset]}>
            Share with your friends
          </ScreenTitle>
          <View style={styles.divider} />
        </View>

        <Carousel
          title={heading}
          titleStyle={styles.carouselTitle}
        >
          {SHARE_FRIENDS_MOCK_DATA.map(friend => (
            <FriendCard
              key={friend.id}
              name={friend.name}
              avatarUrl={friend.avatarUrl}
              isSelected={selectedIds.includes(friend.id)}
              onPress={() => toggleFriends(friend.id)}
            />
          ))}
        </Carousel>

        <View style={[styles.form]}>
          {!!recipients && <Text>To: {recipients}</Text>}

          <View style={[styles.inset]}>
            <Input
              placeholder='Check this out!'
              multiline
              containerStyle={styles.input}
            />
          </View>

          <View style={styles.divider} />

          <GlassContainer>
            <View style={[styles.inset, styles.buttonsContainer]}>
              <Button
                label='Send'
                tintColor={COLORS.status.success}
                onPress={router.back}
              />
              <Button
                label='Cancel'
                variant='secondary'
                onPress={router.back}
              />
            </View>
          </GlassContainer>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg.base
  },
  content: {
    gap: SPACINGS[2]
  },
  inset: {
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  title: {
    paddingVertical: SPACINGS[6],
    gap: SPACINGS[2]
  },
  carouselTitle: {},
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border
  },
  form: {
    gap: SPACINGS[2]
  },
  input: {
    height: undefined,
    minHeight: 110,
    borderRadius: RADIUS.sm
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: SPACINGS[2]
  }
})
