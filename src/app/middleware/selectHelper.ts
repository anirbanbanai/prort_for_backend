import { Query } from "mongoose";
import { TQueryObj } from "../modules/course/course.interface";

export const select = <T>(mQuery: Query<T[], T>, query: TQueryObj) =>{
 if(query.fields){
   return 
 }

   return mQuery
}