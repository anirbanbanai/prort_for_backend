import { Types } from 'mongoose'
import { createdBy } from '../../interface/createdBy'

export type tagsInterface = {
  name: string
  isDeleted: boolean
}
export type detailsInterface = {
  level: string
  description: string
}

export type courseInterface = {
  title: string
  instructor: string
  categoryId: Types.ObjectId
  price: number
  tags: tagsInterface[]
  startDate: string
  endDate: string
  language: string
  provider: string
  durationInWeeks?: number
  details: detailsInterface,
  createdBy ?: createdBy,
  createdAt: string,
  updatedAt: string
}

export type TQueryObj = {
  [key: string]: unknown
  page: string
  searchTerm: string
  sortBy: string
  sortOrder:string,
  minPrice: string
  tags:string
  startDate:string
  language:string
  provider:string
  durationInWeeks:string
  level:string,
  
}
