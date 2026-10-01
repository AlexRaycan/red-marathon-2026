import { COLORS, FONT_SIZE, RADIUS, SPACINGS } from '@app/tokens'
import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'

interface CastCardProps {
  type: 'actor' | 'creator'
  name: string
  role?: string
  photoUrl: string | null
}

export function CastCard({ type, name, role, photoUrl }: CastCardProps) {
  return (
    <View
      key={name}
      style={[styles.castCardContainer]}
    >
      {/* TODO: add fallback image */}
      <Image
        source={photoUrl}
        style={[
          styles.castPhoto,
          type === 'creator' && styles.castPhotoCreator
        ]}
        contentFit='cover'
      />

      <View style={[styles.castLabelContainer]}>
        <Text style={[styles.castLabel]}>{name}</Text>
        {role && <Text style={[styles.creatorRoleLabel]}>{role}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  castCardContainer: {
    width: 100,
    gap: SPACINGS[2]
  },
  castPhoto: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: RADIUS.full
  },
  castPhotoCreator: {
    borderWidth: 1,
    borderColor: COLORS.status.success
  },
  castLabelContainer: {
    gap: SPACINGS[1]
  },
  castLabel: {
    color: COLORS.text.primary,
    textAlign: 'center',
    fontSize: FONT_SIZE.sm
  },
  creatorRoleLabel: {
    color: COLORS.text.muted,
    textAlign: 'center',
    fontSize: FONT_SIZE.xs
  }
})
