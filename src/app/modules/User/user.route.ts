import express from 'express'
import { userController } from './user.controller'
const router = express.Router()

router.post("/auth/register", userController.createUser)
router.get("/auth/register", userController.getUsers)

export const userRouter = router;