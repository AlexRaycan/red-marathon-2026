import { type DiscoverDetailsResponse, useDiscoverFindMyState } from '@app/api'
import { type TReviewSchema, reviewSchema } from '@app/schemas'
import { type IUserReviewStore, useRatingStore } from '@app/store'
import { COLORS, FONT_SIZE, LAYOUT, SPACINGS } from '@app/tokens'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { type RefObject, useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'

import { BottomSheetWindow, Input, PreviewTitleHeader } from '@/components/ui'

import { TitleCardPreviewSmall } from '@/components/elements'

import { useBottomSheetControl, useSaveReview } from '@/hooks'

import { RatingSlider } from './RatingSlider'

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

  const addReviewInStore = useRatingStore(state => state.addReview)

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

  const handleAddReviewStore = useCallback(
    (value: IUserReviewStore) =>
      addReviewInStore({ templateKey: key, review: value }),
    [addReviewInStore, key]
  )

  useEffect(() => {
    if (!isSuccess || isDirty) return

    reset({
      rating: savedRating,
      text: savedText
    })

    if (!savedRating) return

    handleAddReviewStore({
      rating: savedRating,
      text: savedText.trim().length > 0 ? savedText : undefined
    })
  }, [handleAddReviewStore, isDirty, isSuccess, reset, savedRating, savedText])

  const handleSaveReview = useCallback(
    (values: TReviewSchema) => {
      handleAddReviewStore(values)
      close()
    },
    [close, handleAddReviewStore]
  )

  const onSubmit = handleSubmit(values =>
    saveReview(
      values,
      () => handleSaveReview(values),
      errorMessage => {
        setError('root', {
          message: errorMessage ?? 'Failed to save review. Please try again.'
        })
      }
    )
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
            <TitleCardPreviewSmall
              type={title.type}
              coverUrl={title.coverUrl}
            />
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
