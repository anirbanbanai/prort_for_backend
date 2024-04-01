import express from 'express'
import { validateRequest } from '../../middleware/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../User/user.interface';

const router = express.Router();

router.post("/auth/login", validateRequest(authValidation.loginValidation), authController.loginUser);

router.post("/auth/change-password",auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(authValidation.changePasswordValidation), authController.changePassword);

export const AuthRoutes = router;