export interface IShareFriends {
  id: string
  name: string
  avatarUrl: string
}

export const SHARE_FRIENDS_MOCK_DATA: IShareFriends[] = [
  {
    id: '1',
    name: 'John Doe',
    avatarUrl: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: '2',
    name: 'Jane Doe',
    avatarUrl: 'https://i.pravatar.cc/150?img=13'
  },
  {
    id: '3',
    name: 'John Smith',
    avatarUrl: 'https://i.pravatar.cc/150?img=14'
  },
  {
    id: '4',
    name: 'Jane Smith',
    avatarUrl: 'https://i.pravatar.cc/150?img=15'
  },
  {
    id: '5',
    name: 'John Doe',
    avatarUrl: 'https://i.pravatar.cc/150?img=16'
  }
]
