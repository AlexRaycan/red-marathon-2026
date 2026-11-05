import { COLORS } from '@app/tokens'
import { StyleSheet } from 'react-native'

import { AvatarCard } from '@/components/ui'

interface CastCardProps {
  type: 'actor' | 'creator'
  name: string
  role?: string
  photoUrl: string | null
  width?: number
}

export function CastCard({
  type,
  name,
  role,
  photoUrl,
  width = 100
}: CastCardProps) {
  return (
    <AvatarCard
      name={name}
      role={role}
      avatarUrl={photoUrl}
      width={width}
      imageStyle={[type === 'creator' && styles.castPhotoCreator]}
    />
  )
}

const styles = StyleSheet.create({
  castPhotoCreator: {
    borderWidth: 1,
    borderColor: COLORS.status.success
  }
})
