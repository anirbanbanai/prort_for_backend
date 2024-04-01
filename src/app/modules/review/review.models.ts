import { Schema, model } from 'mongoose'
import { reviewInterface } from './review.interface'
import { createdBys } from '../../interface/createdBy'


const reviewSchema = new Schema<reviewInterface>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Courses',
    
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  review: { type: String, required: true },
  createdBy:createdBys,
  createdAt: String,
  updatedAt: String
},
{
  timestamps: true
})

export const ReviewModel = model<reviewInterface>('review', reviewSchema)
