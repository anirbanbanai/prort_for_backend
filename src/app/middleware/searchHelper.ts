import { FilterQuery, Query } from 'mongoose'
import { TQueryObj } from '../modules/course/course.interface'

export const search = <T>(mQuery: Query<T[], T>, query: TQueryObj) => {
  if (query.searchTerm) {
    const fieldValue = Object.values(mQuery.model.schema.paths)
    const serachableField = fieldValue
      .filter((fb) => {
        if (fb.instance === 'String') {
          return true
        }
      })
      .map(
        (fb) =>
          ({
            [fb.path]: { $regex: query.searchTerm, $options: 'i' },
          }) as FilterQuery<T>,
      )

    mQuery.find({
      $or: serachableField,
    })
  }
  return mQuery
}
