import { Query } from "mongoose";
import { TQueryObj } from "../modules/course/course.interface";

export const sort = <T>(mQuery: Query<T[], T>, query: TQueryObj) =>{
   if(query.sortBy && query.sortOrder){
    const sortBy= query.sortBy;
    const sortOrder = query.sortOrder;
    const sortStr = ` ${sortOrder === "desc" ? "-"  : ""} ${sortBy} `
    mQuery.sort(sortStr)
   }

   return mQuery
}