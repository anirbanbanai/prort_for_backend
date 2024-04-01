import express from 'express'
import { ReviewController } from './review.controller'

import { reviewValidation } from './review.validation'
import { validateRequest } from '../../middleware/validateRequest'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../User/user.interface'
const router = express.Router()

router.post(
  '/reviews',
  auth(USER_ROLE.user),
  validateRequest(reviewValidation.reviewValidationSchema),
  ReviewController.createRevew,
)
router.get('/reviews', ReviewController.getReview)
router.get('/reviews/:courseId', ReviewController.getSingleUniqueReview)
router.get('/course/best', ReviewController.getFindTopRating)

export const ReviewRoutes = router
