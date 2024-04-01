import { ZodError } from "zod";

const handleZodError  = (err: ZodError) => {
  
    const statusCode = 400;
    return {
      statusCode,
      message: 'Zod validation error',
      err
    }
  }

  export default handleZodError