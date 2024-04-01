// import mongoose from "mongoose";
// import { TErrorSource, } from "../interface/error";

// const handleCastError = (err: mongoose.Error.CastError) =>{
//     const errorSources : TErrorSource = [{
//         path: err?.path,
//         message: err?.message
//     }];

//     const statusCode= 400;

//     return {
//         statusCode,
//         message: "Cast Error",
//         errorSources
//     }
// }

// export default handleCastError;

import mongoose from 'mongoose'
import {  TGenericErrorRes } from '../interface/error'

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorRes => {
  const Message = err.value;
    const errorMessage =  `${Message} is not a valid Id`;

  const statusCode = 400
  return {
    statusCode,
    message: 'Invald Id',
    errorMessage,
  }
}

export default handleCastError



// import mongoose from 'mongoose';
// import { TGenericErrorRes } from '../interface/error';

// const handleCastError = (
//   err: mongoose.Error.CastError,
// ): TGenericErrorRes => {
//   const Message = err.value;
//   const errorMessage =  `${Message} is not a valid Id`;

//   const statusCode = 400;

//   return {
//     statusCode,
//     message: 'Invalid ID',
//     errorMessage,
//   };
// };

// export default handleCastError;