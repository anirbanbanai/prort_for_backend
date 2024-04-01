import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { CourseService } from './course.service'
import { Request, Response } from 'express'
import { ReviewService } from '../review/review.service'


const createCourse = catchAsync(async (req: Request, res: Response) => {
  const course = req.body;
  const result = await CourseService.createCourseIntoDb(course, req.username)
 


  const {createdAt,updatedAt,title,instructor,categoryId,price,tags,startDate,endDate,language,provider,durationInWeeks,details,} = result;

  const result3 = {
    _id: result._id,
    title,
    instructor,
    categoryId,
    price,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    details,
    createdBy:result.createdBy?._id,
   createdAt,
   updatedAt
  }



  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result3,
  })
})

const getCourse = catchAsync(async (req, res) => {
  const data = req.query

  const result = await CourseService.getCourseIntoDb(data)

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    meta: {
      page: Number(data.page || 0),
      limit: Number(data.limit || 0),
      total: result.length,
    },
    data: {
      courses: result
    },
  })
})

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.params
  const upData = req.body
  const result = await CourseService.updateSingleCourseIntoDb(_id, upData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  })
})

const getCourseWithReview = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params.courseId
  const result1 = await CourseService.getSingleCourseIntoDb(courseId)

  const result2 = await ReviewService.getSingleReview(courseId)
  const result = {
    course: result1,
    reviews: result2,
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  })
})

export const courseController = {
  createCourse,
  getCourse,
  getCourseWithReview,
  updateCourse,
}
