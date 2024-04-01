import { Query } from "mongoose";
import { TQueryObj } from "../modules/course/course.interface";

export const filter = <T>(model: Query<T[],T>, query: TQueryObj) => {
  const queryObj = {...query}
    const exCluField = [
      'page',
      'sortBy',
      'searchTerm',
      'sortOrder',
      'minPrice',
      'tags',
      'startDate',
      'language',
      'provider',
      'durationInWeeks',
      'level',
    ]
    exCluField.forEach((key) => delete queryObj[key])
    const querys = model.find(queryObj);
    
    return querys;
  }