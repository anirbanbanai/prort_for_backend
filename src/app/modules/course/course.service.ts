/* eslint-disable @typescript-eslint/no-explicit-any */


import { createdBy } from '../../interface/createdBy'
import {courseInterface } from './course.interface'
import { CourseModel } from './course.model'
import { JwtPayload } from 'jsonwebtoken'

const calculateDurationInWeeks = (
  startDate: string,
  endDate: string,
): number => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const timeDiff = end.getTime() - start.getTime()
  return timeDiff / (7 * 24 * 60 * 60 * 1000)
}

const createCourseIntoDb = async (course: courseInterface,user: JwtPayload) => {

  const datass  = {
    _id: user?._id,
    username: user.username,
    email: user.email,
    role: user.role
  }

  course.createdBy = datass as createdBy;


  // const datass  = {
  //   _id: username?._id,
  //   username: username.username,
  //   email: username.email,
  //   role: username.role
  // }
  const durationWeek = calculateDurationInWeeks(
    course.startDate,
    course.endDate,
  )
  course.durationInWeeks = Math.ceil(Number(durationWeek))
 
 
  const newCourse = await CourseModel.create(course)
  return newCourse
}

const getCourseIntoDb = async (query: Record<string, unknown>) => {
  const queryObject = { ...query }

  let searchTerm = ''

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }
  const searchQuery = CourseModel.find({
    $or: ['title'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  const excludeField = ['searchTerm', 'sortBy', 'limit', 'page', 'fields']

  excludeField.forEach((el) => delete queryObject[el])

  const filterQuery = searchQuery.find(queryObject)

  let sortBy = '-createdAt'

  if (query?.sort) {
    sortBy = query.sort as string
  }
  const sortQuery = filterQuery.sort(sortBy)
  let page = 1
  let limit = 10
  let skip = 0

  if (query?.limit) {
    limit = Number(query.limit)
  }

  if (query?.page) {
    page = Number(query.page)
    skip = (page - 1) * limit
  }

  const paginateQuery = sortQuery.skip(skip)
  const limitQuery = paginateQuery.limit(limit)

  let fields = '-__v'

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ')
  }

  const fieldQuery = await limitQuery.select(fields)

  return fieldQuery
}




// const getCourseIntoDb = async (query: TQueryObj): Promise<courseInterface[]> => {

//   const FilterQuery = filter(CourseModel.find(), query)
//   const searchQuery = search(FilterQuery, query);
//   // const sortedQuery = sort(searchQuery, query)
//   // const paginatedQury = paginate(sortedQuery, query);
//   // const seletedQuery = select(paginatedQury, query)

//   const result = await searchQuery;

//   return result
// }

// const getCourseIntoDb = async (query: Record<string, unknown>) => {
//   const ress = await CourseModel.find(query)
//   return ress
// }

const getBestCourseIntoDb = async (id: string) => {
  const result = await CourseModel.find({ _id: id })
  return result
}
const getSingleCourseIntoDb = async (_id: string) => {
  const result = await CourseModel.findById({ _id })
  return result
}

const updateSingleCourseIntoDb = async (
  id: string,
  payload: Partial<courseInterface>,
) => {
  const { tags, details, ...remaining } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remaining,
  }

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value
    }
  }
  if (tags && tags.length > 0) {
    const getDeletedTags = tags
      .filter((el) => el.name && el.isDeleted)
      .map((el) => el.name)

    await CourseModel.findByIdAndUpdate(
      id,
      {
        $pull: { tags: { name: { $in: getDeletedTags } } },
      },
      {
        new: true,
        runValidators: true,
      },
    )
    // filter added tags data
    const getNewTags = tags?.filter((el) => el.name && !el.isDeleted)

    await CourseModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { tags: { $each: getNewTags } },
      },
      {
        new: true,
        runValidators: true,
      },
    )
  }

  const result = await CourseModel.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })

  return result
}

export const CourseService = {
  createCourseIntoDb,
  getCourseIntoDb,
  getSingleCourseIntoDb,
  getBestCourseIntoDb,
  updateSingleCourseIntoDb,
  
}
