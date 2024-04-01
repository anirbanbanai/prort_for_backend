import express from 'express'
import { courseController } from './course.controller'

import { CourseValidation } from './course.validation'
import { validateRequest } from '../../middleware/validateRequest'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../User/user.interface'
const router = express.Router()


router.post(
  '/courses',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.CourseValidationSchema),
  courseController.createCourse,
)

router.get('/courses', courseController.getCourse)
router.get('/courses/:courseId/reviews', courseController.getCourseWithReview)
router.put('/courses/:_id', auth(USER_ROLE.admin), courseController.updateCourse)

export const CourseRoutes = router
