import type { NotificationResponse } from '@app/api'

const mockTitles = [
  { key: 'tmdb-movie-1368337', name: 'The Odyssey' },
  { key: 'tmdb-tv_show-247718', name: 'MobLand' },
  { key: 'rawg-game-248521', name: 'Valheim' },
  {
    key: 'shikimori-anime-58567',
    name: 'Ore dake Level Up na Ken Season 2: Arise from the Shadow'
  },
  { key: 'google_books-book-HMAeEgAAQBAJ', name: 'Tender is the Night' },
  {
    key: 'tmdb-movie-1300968',
    name: 'The Hunger Games: Sunrise on the Reaping'
  },
  {
    key: 'tmdb-tv_show-84773',
    name: 'The Lord of the Rings: The Rings of Power'
  },
  { key: 'rawg-game-972995', name: 'Grand Theft Auto VI' },
  { key: 'shikimori-anime-59978', name: 'Sousou no Frieren 2nd Season' },
  { key: 'google_books-book-E5QOEgAAQBAJ', name: 'In Desert and Wilderness' },
  { key: 'tmdb-movie-1003596', name: 'Avengers: Doomsday' },
  { key: 'tmdb-tv_show-291507', name: 'The Body' },
  { key: 'rawg-game-1004298', name: '007 First Light' },
  { key: 'shikimori-anime-60543', name: 'Dandadan 2nd Season' },
  { key: 'google_books-book-7rzMEQAAQBAJ', name: 'The Maltese Falcon' },
  { key: 'tmdb-movie-1185344', name: 'The Beast' },
  { key: 'tmdb-tv_show-259909', name: 'Dexter: Resurrection' },
  { key: 'rawg-game-975605', name: 'Enshrouded' },
  {
    key: 'shikimori-anime-57658',
    name: 'Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen'
  },
  { key: 'google_books-book-QR9rEQAAQBAJ', name: 'White fang' }
]

export const MOCK_NOTIFICATIONS = mockTitles.map<NotificationResponse>(
  ({ key, name }, index) => {
    const createdAt = new Date(Date.UTC(2026, 10, 20 - index, 16)).toISOString()
    const isRead = index % 2 === 1

    return {
      id: `mock-${key}`,
      type: 'RECOMMENDATION',
      title: name,
      message: 'Recommended based on the titles in your library.',
      isRead,
      readAt: isRead ? createdAt : null,
      entityType: 'TITLE',
      entityId: key,
      actor: null,
      createdAt
    }
  }
)
