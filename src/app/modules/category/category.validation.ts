import { z } from 'zod'

const cateoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    createdBy: z.string().optional(),
  }),
})

export const categoryValidation = {
  cateoryValidationSchema,
}
