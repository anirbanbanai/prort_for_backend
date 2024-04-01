import express from 'express'
import { categoryController } from './category.controller'
import { categoryValidation } from './category.validation'
import { validateRequest } from '../../middleware/validateRequest'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../User/user.interface'
const router = express.Router()

router.post('/categories',auth(USER_ROLE.admin), validateRequest(categoryValidation.cateoryValidationSchema), categoryController.createCategory)
router.get('/categories', categoryController.getCategory)

export const CategoryRoutes = router
