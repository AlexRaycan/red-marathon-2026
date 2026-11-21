import type { Href } from 'expo-router'

export function getNotificationHref(
  entityType: unknown,
  entityId: unknown
): Extract<Href, string> | null {
  if (typeof entityId !== 'string') return null

  switch (entityType) {
    case 'COLLECTION':
      return `/collections/${entityId}`
    case 'TITLE':
      return `/title/${entityId}`
    default:
      return null
  }
}
