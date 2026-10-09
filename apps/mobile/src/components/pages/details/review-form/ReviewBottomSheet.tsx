import { type DiscoverDetailsResponse, useDiscoverFindMyState } from '@app/api'
import { type TReviewSchema, reviewSchema } from '@app/schemas'
import { COLORS, FONT_SIZE, LAYOUT, SPACINGS } from '@app/tokens'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { type RefObject, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'

import { BottomSheetWindow, Input } from '@/components/ui'

import { TitleCardPreviewSmall } from '@/components/titles'
import { PreviewTitleHeader } from '@/components/ui/PreviewTitleHeader'

import { RatingSlider } from './RatingSlider'
import { useBottomSheetControl, useSaveReview } from '@/hooks'

interface ReviewBottomSheetProps {
  title: Pick<
    DiscoverDetailsResponse,
    'type' | 'coverUrl' | 'name' | 'releaseDate' | 'key'
  >
  ref: RefObject<BottomSheet | null>
}

export function ReviewBottomSheet({ title, ref }: ReviewBottomSheetProps) {
  const key = title?.key
  const { close } = useBottomSheetControl(ref)

  const { data: myState, isSuccess } = useDiscoverFindMyState(key)

  const review = myState?.data.review ?? null
  const savedRating = review?.rating
  const savedText = review?.text ?? ''

  const titleName = title?.name

  const { saveReview, isSaving } = useSaveReview(key, review?.id ?? null)

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
    setError,
    reset
  } = useForm<TReviewSchema>({
    resolver: zodResolver(reviewSchema),
    mode: 'onChange',
    defaultValues: {
      rating: review?.rating,
      text: review?.text ?? ''
    }
  })

  useEffect(() => {
    if (!isSuccess || isDirty) return

    reset({
      rating: savedRating,
      text: savedText
    })
  }, [isDirty, isSuccess, reset, savedRating, savedText])

  const onSubmit = handleSubmit(values =>
    saveReview(values, close, errorMessage => {
      setError('root', {
        message: errorMessage ?? 'Failed to save review. Please try again.'
      })
    })
  )

  return (
    <BottomSheetWindow
      ref={ref}
      title={'Log in to share'}
      isSubmitButtonDisabled={!isSuccess || !isValid || isSaving}
      submitButtonText={review ? 'Save' : 'Send'}
      onSubmit={onSubmit}
    >
      <View style={[styles.inset, styles.content]}>
        {titleName && (
          <PreviewTitleHeader
            text={titleName}
            style={styles.carouselTitle}
          >
            <TitleCardPreviewSmall title={title} />
          </PreviewTitleHeader>
        )}

        <Controller
          control={control}
          name='rating'
          render={({ field }) => (
            <RatingSlider
              value={field.value ?? null}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={control}
          name='text'
          render={({ field, fieldState }) => (
            <Input
              tintColor={'rgba(255, 255, 255, 0.08)'}
              multiline
              placeholder='Share your thoughts (optional)'
              value={field.value}
              error={fieldState.error?.message}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />

        {!!errors.root && (
          <Text style={styles.error}>{errors.root.message}</Text>
        )}
      </View>
    </BottomSheetWindow>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: SPACINGS[4],
    paddingTop: SPACINGS[4]
  },
  inset: {
    paddingHorizontal: LAYOUT['space-horizontal']
  },
  carouselTitle: {
    fontSize: FONT_SIZE.base
  },
  error: {
    color: COLORS.status.error,
    fontSize: FONT_SIZE.sm
  }
})
