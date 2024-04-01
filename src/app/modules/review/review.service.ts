import { JwtPayload } from 'jsonwebtoken'
import { CourseModel } from '../course/course.model'
import { reviewInterface } from './review.interface'
import { ReviewModel } from './review.models'
import { createdBy } from '../../interface/createdBy'

const createReviewIntoDb = async (review: reviewInterface, user:JwtPayload) => {
  const datass  = {
    _id: user?._id,
    username: user.username,
    email: user.email,
    role: user.role
  }

  review.createdBy = datass as createdBy;
  const result = await ReviewModel.create(review)

  return result
}

const getReviewIntoDb = async () => {
  const result = await ReviewModel.find()
  return result
}
const getSingleReview = async (id: string) => {
  
  const result = await ReviewModel.find({ courseId: id })

  return result
}

const getfindRatingReview = async () => {
  const result = await ReviewModel.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ])
    .sort({ averageRating: -1 })
    .limit(1)
    .exec()

  if (result.length > 0) {
    const bestCourseId = result[0]._id
    const bestCourse = await CourseModel.findById(bestCourseId)

    const { averageRating, reviewCount } = result[0]
    const bestWith = {
      course: bestCourse,
      averageRating: (parseFloat(averageRating).toFixed(1)),
      reviewCount: reviewCount,
    }

    return bestWith
  } else {
    return null
  }
}

export const ReviewService = {
  createReviewIntoDb,
  getReviewIntoDb,
  getSingleReview,
  getfindRatingReview,
}
