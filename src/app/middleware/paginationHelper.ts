import { Query } from "mongoose";
import { TQueryObj } from "../modules/course/course.interface";

export const paginate = <T>(mQuery: Query<T[], T>, query: TQueryObj) =>{
   if(query.page && query.limit){
    const page = Number(query.page) || 1
    const limit  = Number(query.limit) || 10
    const skip = (page - 1) * limit
    mQuery.skip(skip).limit(limit)
   }else{
    mQuery.skip(0).limit(10)
   }

   return mQuery
}