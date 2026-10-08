import { getDiscoverFindByKeyQueryKey, useReviewCreateByDiscoverKey } from '@app/api'
import { useQueryClient } from '@tanstack/react-query'

export function useSaveReview(key: string, reviewId: string | null) {
  const queryClient = useQueryClient()

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: getDiscoverFindByKeyQueryKey(key)
    })
  }

  const create = useReviewCreateByDiscoverKey({
    mutation: {
      onSuccess: () => {
    }
  })
}
