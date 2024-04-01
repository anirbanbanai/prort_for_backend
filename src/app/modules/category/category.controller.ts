import { Request, Response } from 'express'
import { CategoryService } from './category.service'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body
  const result = await CategoryService.createCategoryIntoDb(category, req.username)



const { name,createdAt,updatedAt} = result

const result3 = {
  _id: result._id,
  name,
  createdBy: result.createdBy?._id,
  createdAt,
  updatedAt
}

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: {
      categories: result3
    },
  })
})

const getCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getCategoryIntoDb()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  })
})

export const categoryController = {
  createCategory,
  getCategory,
}
