import { REVIEWS_RATING, REVIEW_TEXT_LENGTH } from '@app/constants'
import z from 'zod'

export const reviewSchema = z.object({
  rating: z
    .number({
      error: 'Rate the title'
    })
    .int()
    .min(REVIEWS_RATING.min)
    .max(REVIEWS_RATING.max),
  text: z
    .string()
    .trim()
    .max(REVIEW_TEXT_LENGTH.max, {
      error: `Up to ${REVIEW_TEXT_LENGTH.max} characters`
    })
    .refine(text => !text || text.length >= REVIEW_TEXT_LENGTH.min, {
      error: `At least ${REVIEW_TEXT_LENGTH.min} characters or leave empty`
    })
})

export type TReviewSchema = z.infer<typeof reviewSchema>
