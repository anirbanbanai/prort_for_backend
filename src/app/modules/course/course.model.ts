import { Schema, model } from 'mongoose'
import {
  courseInterface,
  detailsInterface,
  tagsInterface,
} from './course.interface'
import { createdBys } from '../../interface/createdBy'

const TagsSchema = new Schema<tagsInterface>({
  name: { type: String },
  isDeleted: { type: Boolean },
})
const DetailsSchema = new Schema<detailsInterface>({
  level: { type: String, required: true },
  description: { type: String, required: true },
})

const courseSchema = new Schema<courseInterface>(
  {
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    price: { type: Number, required: true },
    tags: [TagsSchema],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: DetailsSchema,
    createdBy: { type: createdBys, ref: 'users' },
  },
  {
    timestamps: true,
  },
)

export const CourseModel = model<courseInterface>('Course', courseSchema)
