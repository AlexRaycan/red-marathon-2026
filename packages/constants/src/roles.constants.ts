import type { CreatorRole } from '@app/api'

export const CREATOR_ROLES_LABELS: Record<CreatorRole, string> = {
  DIRECTOR: 'Director',
  CREATOR: 'Created by',
  STUDIO: 'Studio',
  AUTHOR: 'Author'
}
