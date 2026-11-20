import type { NotificationResponse } from '@app/api'

export const MOCK_NOTIFICATIONS: NotificationResponse[] = [
  {
    id: 'mock-1',
    type: 'RECOMMENDATION',
    title: 'A new recommendation',
    message:
      'Based on the sci-fi films and series in your library, we think you might enjoy Severance. Save it to your watchlist for the next time you’re looking for something new.',
    isRead: false,
    readAt: null,
    entityType: null,
    entityId: null,
    actor: null,
    createdAt: '2026-11-19T15:00:00Z'
  },
  {
    id: 'mock-2',
    type: 'COLLECTION_SHARED',
    title: 'A collection was shared with you',
    message: 'Maya shared her Weekend Watchlist collection with you.',
    isRead: false,
    readAt: null,
    entityType: null,
    entityId: null,
    actor: null,
    createdAt: '2026-11-18T12:00:00Z'
  },
  {
    id: 'mock-3',
    type: 'FRIEND_ACCEPTED',
    title: 'Friend request accepted',
    message: 'Alex accepted your friend request.',
    isRead: true,
    readAt: '2026-11-17T16:00:00Z',
    entityType: null,
    entityId: null,
    actor: null,
    createdAt: '2026-11-17T14:00:00Z'
  },
  {
    id: 'mock-4',
    type: 'SYSTEM',
    title: 'Welcome to SagaSet',
    message: 'Add a title to start building your library.',
    isRead: true,
    readAt: '2026-11-15T17:00:00Z',
    entityType: null,
    entityId: null,
    actor: null,
    createdAt: '2026-11-15T16:00:00Z'
  }
]
