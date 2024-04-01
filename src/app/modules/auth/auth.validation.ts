import { z } from "zod";

const loginValidation = z.object({
    body: z.object({
        username: z.string({required_error:"Username is required"}),
        password: z.string({required_error:"PAssword is required"})
    })
})
// const changePasswordValidation = z.object({
//     body: z.object({
//         currentPassword: z.string({required_error:"Old password is required"}),
//         newPassword: z.string({required_error:"new Password is required"})
//     })
// })

export const changePasswordValidation = z.object({
    body: z.object({
      currentPassword: z.string({
        required_error: 'Current password is required',
      }),
      newPassword: z
        .string({
          invalid_type_error: 'Password must be a string',
        })
        // .min(6, {
        //   message: 'Password should be at least 6 characters long, e.g., 123Az#',
        // })
        // .max(20, {
        //   message: 'Password should not exceed 20 characters, e.g., 123Az#',
        // })
        // .regex(/[A-Z]/, {
        //   message:
        //     'Password must include at least one uppercase letter, e.g., 123Az#',
        // })
        // .regex(/[0-9]/, {
        //   message: 'Password must include at least one number, e.g., 123Az#',
        // })
        // .regex(/[^a-zA-Z0-9]/, {
        //   message:
        //     'Password must include at least one special character, e.g., 123Az#',
        // }),
    }),
  });


export const authValidation ={
    loginValidation,
    changePasswordValidation
}