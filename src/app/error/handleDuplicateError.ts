
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorRes } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorRes => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorMessage = `${extractedMessage} is already exist`;

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
  };
};

export default handleDuplicateError;