import {
  getApiErrorMessage,
  invalidateTitleState,
  useCreateReview,
  useUpdateReview
} from '@app/api'
import type { TReviewSchema } from '@app/schemas'
import { useQueryClient } from '@tanstack/react-query'

export function useSaveReview(key: string, reviewId: string | null) {
  const queryClient = useQueryClient()

  const onSuccess = () => invalidateTitleState(queryClient, key)

  const create = useCreateReview({
    mutation: {
      onSuccess
    }
  })
  const update = useUpdateReview({
    mutation: {
      onSuccess
    }
  })

  const saveReview = (
    { rating, text }: TReviewSchema,
    onSaved?: () => void,
    onFailed?: (message: string | null) => void
  ) => {
    const callbacks = {
      onSuccess: onSaved,
      onError: (error: unknown) => onFailed?.(getApiErrorMessage(error))
    }

    if (reviewId) {
      update.mutate(
        {
          id: reviewId,
          data: { rating, text: text || undefined }
        },
        callbacks
      )

      return
    }

    create.mutate(
      {
        key,
        data: { rating, text: text || undefined }
      },
      callbacks
    )
  }

  return {
    saveReview,
    isSaving: create.isPending || update.isPending
  }
}
