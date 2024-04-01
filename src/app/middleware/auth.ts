import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync'
import config from '../config'
import { UserRole } from '../modules/User/user.interface'

export const auth = (...requiredRole: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    
    if (!token) {
      throw new Error('You are not authorized')
    }

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new Error('You are not authorized')
        }
        req.username = decoded as JwtPayload
        const role = (decoded as JwtPayload).role
        
        if (requiredRole && !requiredRole.includes(role)) {
          throw new Error('You are not authorized')
        }
       
      },
    );
    next()
  })
}
