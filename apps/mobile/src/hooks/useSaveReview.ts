import {
  getDiscoverFindByKeyQueryKey,
  getReviewFindByDiscoverKeyQueryKey,
  useReviewCreateByDiscoverKey,
  useReviewUpdate
} from '@app/api'
import type { TReviewSchema } from '@app/schemas'
import { useQueryClient } from '@tanstack/react-query'

export function useSaveReview(key: string, reviewId: string | null) {
  const queryClient = useQueryClient()

  const onSuccess = () => {
    void Promise.all([
      queryClient.invalidateQueries({
        queryKey: getDiscoverFindByKeyQueryKey(key)
      }),
      queryClient.invalidateQueries({
        queryKey: getReviewFindByDiscoverKeyQueryKey(key)
      })
    ])
  }

  const create = useReviewCreateByDiscoverKey({
    mutation: {
      onSuccess
    }
  })
  const update = useReviewUpdate({
    mutation: {
      onSuccess
    }
  })

  const saveReview = (
    { rating, text }: TReviewSchema,
    onSaved?: () => void
  ) => {
    if (reviewId) {
      update.mutate(
        {
          id: reviewId,
          data: { rating, text }
        },
        {
          onSuccess: () => {
            onSaved?.()
          }
        }
      )

      return
    }

    create.mutate(
      {
        key,
        data: { rating, text }
      },
      {
        onSuccess: () => {
          onSaved?.()
        }
      }
    )
  }

  return {
    saveReview,
    isSaving: create.isPending || update.isPending
  }
}
