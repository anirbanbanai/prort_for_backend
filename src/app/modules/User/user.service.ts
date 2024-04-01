
import { userInterface } from "./user.interface";
import { userModel } from "./user.models";

  
const createUserIntoDb = async(user: userInterface)=>{
  const result = await userModel.create(user);
 
  return result;
  
}


const getUserWithOutPassIntoDb = async (user: userInterface) => {
    const result = await userModel.findOne({ username: user?.username }, { _id: 1, username: 1, email: 1 })
    return result
  }
const getUserIntoDb = async () => {
    const result = await userModel.find()
    return result
  }
  

export const userService = {
    createUserIntoDb,
    getUserIntoDb,
    getUserWithOutPassIntoDb
}