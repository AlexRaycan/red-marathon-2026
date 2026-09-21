import type { RegisterDto } from '@app/api'
import { z } from 'zod'

export const authSchema = z.object({
  email: z.email('Invalid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters')
}) satisfies z.ZodType<RegisterDto>

export type TAuthSchema = z.infer<typeof authSchema>
