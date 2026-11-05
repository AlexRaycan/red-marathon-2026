import { create } from 'zustand'

export interface IUserReviewStore {
  rating?: number
  text?: string
}

type TUserReviews = Record<string, IUserReviewStore> | null

interface IRatingState {
  userReviews: TUserReviews
  addReview: (newReview: {
    templateKey: string
    review: IUserReviewStore
  }) => void
  removeReviews: () => void
}

export const useRatingStore = create<IRatingState>(set => ({
  userReviews: null,
  addReview: ({ templateKey, review }) =>
    set(state => ({
      userReviews: {
        ...state.userReviews,
        [templateKey]: {
          ...review
        }
      }
    })),
  removeReviews: () => set({ userReviews: null })
}))
