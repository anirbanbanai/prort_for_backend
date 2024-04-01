/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import handleZodError from '../error/handleZodError'
import handleValidationError from '../error/handleValidationError'
import handleCastError from '../error/handleCastError'
import handleDuplicateError from '../error/handleDuplicateError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandleling: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong'
  let ErrorMessage = '';
  const errorDetails = err

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = 'Zod Validation Error'
    const eee = err.issues[0].path[1]
    ErrorMessage = `${eee} is required`
  } 
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    ErrorMessage = simplifiedError?.errorSources[0].message
  } 
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    ErrorMessage = simplifiedError?.errorMessage
  }
   else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    ErrorMessage = simplifiedError?.errorMessage
  } 
  else if (err instanceof Error) {
    message = err.message
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ErrorMessage,
    errorDetails,
    stack:err?.stack 
  })
}

export default globalErrorHandleling
