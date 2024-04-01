import { Request, Response } from 'express'
import { ReviewService } from './review.service'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createRevew = catchAsync(async (req: Request, res: Response) => {

  const category = req.body
  const result = await ReviewService.createReviewIntoDb(category, req.username)
 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  })
})

const getReview = catchAsync(async (req, res) => {
  const result = await ReviewService.getReviewIntoDb()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fatched successfull',
    data: result,
  })
})

const getSingleUniqueReview = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params
    const result = await ReviewService.getSingleReview(courseId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review Fatched successfully',
      data: result,
    })
  },
)

const getFindTopRating = catchAsync(async (req, res) => {
  const result = await ReviewService.getfindRatingReview()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Best course retrieved successfully',
    data: result,
  })
})

export const ReviewController = {
  createRevew,
  getReview,
  getSingleUniqueReview,
  getFindTopRating,
}
