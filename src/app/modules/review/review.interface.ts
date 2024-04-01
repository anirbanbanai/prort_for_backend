import { Types } from 'mongoose'
import { createdBy } from '../../interface/createdBy'



export type reviewInterface = {
  courseId: Types.ObjectId
  rating: 1 | 2 | 3 | 4 | 5
  review: string
  createdBy?:createdBy,
  createdAt: string,
  updatedAt: string
}
 