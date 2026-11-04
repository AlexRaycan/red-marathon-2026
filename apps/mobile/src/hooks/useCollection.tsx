import {
  invalidateCollectionState,
  useAddToCollection,
  useMyCollections,
  useRemoveFromCollection,
  useUserTitle
} from '@app/api'
import { useQueryClient } from '@tanstack/react-query'

export function useCollection(key: string) {
  const queryClient = useQueryClient()

  const { data: collectionData } = useMyCollections()
  const { data: userTitle } = useUserTitle(key)

  const collections =
    collectionData?.status === 200 ? collectionData.data.items : []

  const collectionIds = userTitle?.data.collectionIds ?? []

  const onSettled = (_data: unknown, _error: unknown, { id }: { id: string }) =>
    invalidateCollectionState(queryClient, id, key)

  const addMutation = useAddToCollection({ mutation: { onSettled } })
  const removeMutation = useRemoveFromCollection({ mutation: { onSettled } })

  const toggle = (id: string) => {
    const mutation = collectionIds.includes(id) ? removeMutation : addMutation

    mutation.mutate({ id, key })
  }

  return { collections, collectionIds, toggle }
}
