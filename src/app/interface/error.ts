export type TErrorSource = {
    path: string | number
    message: string
  }[]


  export type TGenericErrorRes = {
    statusCode: number;
    message: string;
    errorMessage :string
}