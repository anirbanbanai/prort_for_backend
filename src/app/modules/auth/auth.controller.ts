import httpStatus from "http-status";
import { AuthService } from "./auth.service"
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const loginUser = catchAsync(async(req,res)=>{
    const result = await AuthService.loginUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successful',
        data: result,
      })
})


// const changePassword = catchAsync(async(req,res)=>{
//     const user = req.username;
//     console.log( "user", user);
//     const {...passwordData } = req.body;
//     const result = await AuthService.changePasswordService(user, passwordData);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Password changed successfully',
//         data: result,
//       })
// })

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;
  
    const result = await AuthService.changePasswordService(req.username, passwordData);
  
    const modifiedResult = JSON.parse(JSON.stringify(result));
    delete modifiedResult.password;
    delete modifiedResult.passwordChangeHistory;
    delete modifiedResult.passwordChangeAt;
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Password changed successfully',
      data: modifiedResult,
    });
  });

export const authController  = {
    loginUser,
    changePassword
}