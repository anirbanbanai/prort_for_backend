import { Schema, model } from 'mongoose'
import { categoryInterface } from './category.interface'
import { createdBys } from '../../interface/createdBy'

const categorySchema = new Schema<categoryInterface>({
  name: { type: String, required: true },
  // createdBy: { type: String},
  createdBy: createdBys,
  createdAt: String,
  updatedAt: String
},
{
  timestamps: true
})

export const CategoryModel = model<categoryInterface>(
  'category',
  categorySchema,
)
