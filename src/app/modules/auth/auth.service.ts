/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config'
import { userModel } from '../User/user.models'
// import { TLoginUser } from './auth.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { format } from 'date-fns'
import { IPasswordHistory } from '../User/user.interface'

const loginUser = async (payload: JwtPayload) => {
  const user = await userModel.isUserExistByName(payload?.username)
  if (!(await userModel.isUserExistByName(payload?.username))) {
    throw new Error('Username is not matched')
  }
  if (!(await userModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new Error('password is not matched')
  }
  const jwtPayload = {
    id: (user as any)._id,
    username: user.username,
    email: user.email,
    role: user.role,
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  })
  const { _id, username, email, role } = user
  const withoutPassResult = { _id, username, email, role }

  return {
    user: withoutPassResult,
    token: accessToken,
  }
}

// const changePasswordService = async (
//   userData: JwtPayload,
//   payload: { currentPassword: string; newPassword: string },
// ) => {
//   const user = await userModel.isUserExistByName(userData?.username)
// console.log( "user pssword" ,user?.password );
// console.log( "payload pssword" ,payload.currentPassword );

//   if (!user) {
//     throw new Error('this user is not found')
//   }

//   if (!(await userModel.isPasswordMatched(payload?.currentPassword, user?.password))) {
//     throw new Error('password is not matched')
//   }

//     const newHashedPassword = await bcrypt.hash(payload?.newPassword, Number(config.bcrypt_salt_round))
// console.log("newpassword", newHashedPassword);
//   const result = await userModel.findOneAndUpdate(
//     {
//       id: userData?._id,
//       role: userData?.role
//     },
//     {
//       password: newHashedPassword,
//     },
//     { new: true },
//   )

//   return result
// }

// const changePasswordService = async (
//   userData: JwtPayload,
//   payload: {
//     currentPassword: string;
//     newPassword: string;
//   },
// ) => {
//   // Check if the user is exist
//   const user = await userModel.findById(userData?.id);
//   if (!user) {
//     throw new Error("User not found")
//   }

//   // Check if the password is matched
//   if (
//     !(await userModel.isPasswordMatched(payload?.currentPassword, user?.password))
//   ) {
//     throw new Error("Password do not matched")
//   }

//   // hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload?.newPassword,
//     Number(config.bcrypt_salt_round),
//   );

//   //   Check if the new password is the same as the current one
//   if (await userModel.isPasswordMatched(payload?.newPassword, user?.password)) {
//     const formattedTime = format(
//       new Date(user?.passwordChangeAt as Date),
//       "'(last used on' yyyy-MM-dd 'at' hh:mm a)",
//     );

//     throw new Error(
//        `Password change failed. Ensure the new password is unique and not among the last 2 used ${formattedTime}.`,
//     );
//   }

//   // Check if the given password is in the last two password history
//   const passwordHistory = user?.passwordChangeHistory as IPasswordHistory[];

//   const matchResults = await Promise.all(
//     passwordHistory?.map(async (history) => {
//       const isMatch = await bcrypt.compare(
//         payload.newPassword,
//         history.password,
//       );
//       return { isMatch, history };
//     }),
//   );

//   const indexOfMatch = matchResults.findIndex((result) => result.isMatch);

//   if (indexOfMatch !== -1) {
//     const matchingHistory = matchResults[indexOfMatch].history;

//     const formattedTime = format(
//       new Date(matchingHistory?.time),
//       "'(last used on' yyyy-MM-dd 'at' hh:mm a)",
//     );

//     throw new Error(
//     `  Password change failed. Ensure the new password is unique and not among the last 2 used ${formattedTime}.`,
//     );
//   }

//   // Update password and passwordChangeHistory
//   await userModel.findOneAndUpdate(
//     {
//       _id: userData.id,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//       passwordChangeAt: new Date(),
//       $push: {
//         passwordChangeHistory: {
//           $each: [{ password: user?.password, time: new Date() }],
//           $position: 0,
//           $slice: 2,
//         },
//       },
//     },
//     { new: true },
//   );

//   return user;
// };


const changePasswordService = async (
  userData: JwtPayload,
  payload: {
    currentPassword: string
    newPassword: string
  },
) => {
  try {
    const user = await userModel.findById(userData?.id)
    if (!user) {
      throw new Error('User not found')
    }

    const isCurrentPasswordMatched = await userModel.isPasswordMatched(
      payload?.currentPassword,
      user?.password,
    )
    if (!isCurrentPasswordMatched) {
      throw new Error('Current password does not match')
    }

    const newHashedPassword = await bcrypt.hash(
      payload?.newPassword,
      Number(config.bcrypt_salt_round),
    )

    if (
      await userModel.isPasswordMatched(payload?.newPassword, user?.password)
    ) {
      const formattedTime = format(
        new Date(user?.passwordChangeAt as Date),
        "'(last used on' yyyy-MM-dd 'at' hh:mm a)",
      )

      throw new Error(
        `Password change failed. Ensure the new password is unique and not among the last 2 used ${formattedTime}.`,
      )
    }

    const passwordHistory = user?.passwordChangeHistory as IPasswordHistory[]
    const matchResults = await Promise.all(
      passwordHistory?.map(async (history) => {
        const isMatch = await bcrypt.compare(
          payload.newPassword,
          history.password,
        )
        return { isMatch, history }
      }) || [],
    )

    const indexOfMatch = matchResults.findIndex((result) => result.isMatch)

    if (indexOfMatch !== -1) {
      const matchingHistory = matchResults[indexOfMatch].history

      const formattedTime = format(
        new Date(matchingHistory?.time),
        "'(last used on' yyyy-MM-dd 'at' hh:mm a)",
      )

      throw new Error(
        `Password change failed. Ensure the new password is unique and not among the last 2 used ${formattedTime}.`,
      )
    }

   
    const updatedUser = await userModel.findOneAndUpdate(
      {
        _id: userData.id,
        role: userData.role,
      },
      {
        password: newHashedPassword,
        passwordChangeAt: new Date(),
        $push: {
          passwordChangeHistory: {
            $each: [{ password: user?.password, time: new Date() }],
            $position: 0,
            $slice: 2,
          },
        },
      },
      { new: true },
    )

    return updatedUser
  } catch (error) {
    throw new Error(`Password change failed:`)
  }
}





export const AuthService = {
  loginUser,
  changePasswordService,
}
