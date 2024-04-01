import { Schema } from "mongoose"

export type createdBy = { 
    _id: string,
    username:string,
    email: string,
    role: string
  }

  export const createdBys =new Schema<createdBy> ({ 
    _id: String,
    username:String,
    email: String,
    role: String
  })