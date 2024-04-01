import { Router } from 'express'
import { CourseRoutes } from '../modules/course/course.route'
import { CategoryRoutes } from '../modules/category/category.route'
import { ReviewRoutes } from '../modules/review/review.route'
import { userRouter } from '../modules/User/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
const router = Router()
const moduleRouts = [
  {
    path: '/api',
    router: CourseRoutes,
  },
  {
    path: '/api',
    router: CategoryRoutes,
  },
  {
    path: '/api',
    router: ReviewRoutes,
  },
  {
    path: '/api',
    router: userRouter,
  },
  {
    path: '/api',
    router: AuthRoutes,
  },
]

moduleRouts.forEach((route) => router.use(route.path, route.router))

export default router
