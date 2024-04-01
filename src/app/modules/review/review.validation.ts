
import { z } from 'zod'

const reviewValidationSchema = z.object({
  body: z.object({
    courseId: z
      .string()
      ,

    rating: z.number().min(1).max(5),

    review: z.string(),
    createdBy: z.string().optional()
  }),
})

export const reviewValidation = {
  reviewValidationSchema,
}
