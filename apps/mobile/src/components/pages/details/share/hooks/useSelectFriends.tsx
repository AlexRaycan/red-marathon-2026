import { useState } from 'react'

import { SHARE_FRIENDS_MOCK_DATA } from '../share-friends.mock.data'

export function useSelectFriends() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const recipients = SHARE_FRIENDS_MOCK_DATA.filter(friend =>
    selectedIds.includes(friend.id)
  )
    .map(friend => friend.name)
    .join(', ')

  const handleSelectFriend = (id: string) => {
    setSelectedIds(ids =>
      ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]
    )
  }

  const clearSelectedIds = () => {
    setSelectedIds([])
  }

  return {
    selectedIds,
    setSelectedIds: handleSelectFriend,
    recipients,
    clearSelectedIds
  }
}
