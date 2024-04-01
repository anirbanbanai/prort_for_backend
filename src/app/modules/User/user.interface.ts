/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IPasswordHistory {
    password: string;
    time: Date;
  }

export interface userInterface {
  _id: string
  username: string
  email: string
  password: string
  role: 'user' | 'admin',
  passwordChangeAt?: Date;
  passwordChangeHistory?: [IPasswordHistory],
  createdAt: string,
  updatedAt: string
}

export const USER_ROLE ={
  user:"user",
  admin:"admin"
} as const;



export interface UserModel extends Model<userInterface> {
  isUserExistByName(id:string):Promise<userInterface>,
  isPasswordMatched(plantextPass: string, hashtagPass: string): Promise<boolean>
}

export type UserRole = keyof typeof USER_ROLE;



// /* eslint-disable no-unused-vars */
// import { Model } from 'mongoose';
// import { USER_ROLE } from './auth.constant';
// export type TUserRole = keyof typeof USER_ROLE;

// export interface IPasswordHistory {
//   password: string;
//   time: Date;
// }
// export type TUsers = {
//   username: string;
//   email: string;
//   password: string;
//   role: 'user' | 'admin';
//   passwordChangeAt?: Date;
//   passwordChangeHistory?: [IPasswordHistory];
// };

// export type TLoginUser = {
//   username: string;
//   password: string;
// };

// export interface UserModel extends Model<TUsers> {
//   //instance methods for checking if the user exist
//   isUserExistsByUserName(id: string): Promise<TUsers>;
//   //instance methods for checking if passwords are matched
//   isPasswordMatched(
//     plainTextPassword: string,
//     hashedPassword: string,
//   ): Promise<boolean>;
// }