
import { z } from 'zod'

const tagValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
})
const detailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
})

// const createdByValidation = z.object({
//   _id: z.string(),
//   username: z.string(),
//   email: z.string(),
//   role: z.string()
// })

 const CourseValidationSchema =z.object({
  body:  z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagValidationSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    durationInWeeks: z.number().optional(),
    details: detailsValidationSchema,
  })
 })


export const CourseValidation = {
  CourseValidationSchema
}