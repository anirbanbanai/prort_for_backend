
import { Request, Response } from 'express'
import { userService } from './user.service'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body
  const result = await userService.createUserIntoDb(user)
  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      username: result.username,
      email: result.email,
      role:result.role,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    },
   
  })
})

const getUsers = catchAsync(async (req: Request, res: Response) => {
  
  const result = await userService.getUserIntoDb()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fatched successfully',
    data: result,
  })
})

export const userController = {
  createUser,
  getUsers,
}
