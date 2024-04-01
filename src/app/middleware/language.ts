import { Query } from "mongoose";
import { TQueryObj } from "../modules/course/course.interface";

export const language = <T>(mQuery: Query<T[], T>, query: TQueryObj) =>{
   if(query.language && query.language){
    const language= query.language;
    mQuery.sort(language)
   }

   return mQuery
}