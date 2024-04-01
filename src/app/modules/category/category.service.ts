import { JwtPayload } from 'jsonwebtoken'
import { categoryInterface } from './category.interface'
import { CategoryModel } from './category.model'
import { createdBy } from '../../interface/createdBy'

const createCategoryIntoDb = async (category: categoryInterface,user: JwtPayload) => {

  const datass  = {
    _id: user?._id,
    username: user.username,
    email: user.email,
    role: user.role
  }

  category.createdBy = datass as createdBy;
  const result = await CategoryModel.create(category)

  return result
}

const getCategoryIntoDb = async () => {

  // const userData = await CategoryModel.findById(user.id)
  // console.log(userData);

  const result = await CategoryModel.find()
  return result
}

export const CategoryService = {
  createCategoryIntoDb,
  getCategoryIntoDb,
}
